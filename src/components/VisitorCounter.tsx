
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from "../integrations/supabase/client";
import { Users } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to track a new visit
    const trackVisit = async () => {
      try {
        // Call the track-visit Edge Function
        const { data, error } = await supabase.functions.invoke('track-visit');
        
        if (error) throw error;
        
        if (data && data.visitorCount) {
          setCount(data.visitorCount);
        }
      } catch (err) {
        console.error('Error tracking visit:', err);
        setError('Failed to update visitor count');
        
        // Fallback to just getting the current count
        getVisitorCount();
      } finally {
        setLoading(false);
      }
    };
    
    // Function to get the visitor count without incrementing
    const getVisitorCount = async () => {
      try {
        const { data, error } = await supabase
          .from('visitors_counter')
          .select('count')
          .limit(1)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setCount(data.count);
        }
      } catch (err) {
        console.error('Error getting visitor count:', err);
        setError('Failed to get visitor count');
      } finally {
        setLoading(false);
      }
    };
    
    // Check if the visit has been tracked in this session
    const hasTrackedVisit = sessionStorage.getItem('visit_tracked');
    
    if (!hasTrackedVisit) {
      trackVisit();
      sessionStorage.setItem('visit_tracked', 'true');
    } else {
      getVisitorCount();
    }
    
    // Set up realtime subscription for counter updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'visitors_counter'
        },
        (payload) => {
          if (payload.new && payload.new.count) {
            setCount(payload.new.count);
          }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-cyber-purple">
        <div className="w-3 h-3 rounded-full bg-cyber-purple animate-pulse"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (error) {
    return null; // Don't show anything if there's an error
  }

  return (
    <motion.div 
      className="glass-morphism rounded-full px-3 py-1 flex items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Users size={16} className="text-cyber-neon" />
      <span className="text-xs font-mono">
        <span className="text-white/70">Visitors:</span>{' '}
        <motion.span 
          className="text-cyber-neon font-bold"
          key={count} // Re-trigger animation when count changes
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {count?.toLocaleString() || 0}
        </motion.span>
      </span>
    </motion.div>
  );
};

export default VisitorCounter;
