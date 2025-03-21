
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, RefreshCw } from 'lucide-react';
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";

const SeedDataButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSeedData = async () => {
    try {
      setLoading(true);
      
      // Call seed-data function
      const { data, error } = await supabase.functions.invoke('seed-data');
      
      if (error) throw error;
      
      toast.success("Data seeded successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error seeding data:', error);
      toast.error("Failed to seed data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleSeedData}
      disabled={loading}
      className="fixed bottom-4 left-4 z-40 glass-morphism rounded-full p-3 text-white hover:text-cyber-neon transition-colors group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative flex items-center justify-center">
        {loading ? (
          <RefreshCw size={20} className="animate-spin" />
        ) : (
          <Database size={20} />
        )}
        <span className="absolute left-full ml-2 whitespace-nowrap bg-cyber-dark/90 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          Seed Demo Data
        </span>
      </div>
    </motion.button>
  );
};

export default SeedDataButton;
