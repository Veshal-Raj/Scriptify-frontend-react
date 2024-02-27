// SubscriptionPlans.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const SubscriptionPlans: React.FC = () => {
  return (
    <Container className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <motion.div whileHover={{ scale: 1.05 }} style={{ width: '80%', height: '100%' }}>
            <Paper className="rounded-2xl border border-indigo-600 p-6 shadow-sm lg:p-12 h-full" style={{ width: '100%', height: '100%' }}>
              <div className="text-center">
                <Typography variant="h2" className="text-lg font-medium text-gray-900">
                  Pro <span className="sr-only">Plan</span>
                </Typography>
                <Typography variant="body1" className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> $30 </strong>
                  <span className="text-sm font-medium text-gray-700">/month</span>
                </Typography>
              </div>
              <ul className="mt-6 space-y-2">
                <ListItem icon={<CheckCircleOutline />} text="20 users included" />
                <ListItem icon={<CheckCircleOutline />} text="5GB of storage" />
                <ListItem icon={<CheckCircleOutline />} text="Email support" />
                <ListItem icon={<CheckCircleOutline />} text="Help center access" />
                <ListItem icon={<CheckCircleOutline />} text="Phone support" />
                <ListItem icon={<CheckCircleOutline />} text="Community access" />
              </ul>
              <Button
                href="#"
                className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
              >
                Get Started
              </Button>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div whileHover={{ scale: 1.05 }} style={{ width: '80%', height: '100%' }} className='rounded-full' >
            <Paper className="rounded-full border border-gray-200 p-6 shadow-sm lg:p-12 h-full" style={{ width: '100%', height: '100%' }}>
              <div className="text-center">
                <Typography variant="h2" className="text-lg font-medium text-gray-900">
                  Starter <span className="sr-only">Plan</span>
                </Typography>
                <Typography variant="body1" className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> $20 </strong>
                  <span className="text-sm font-medium text-gray-700">/month</span>
                </Typography>
              </div>
              <ul className="mt-6 space-y-2">
                <ListItem icon={<CheckCircleOutline />} text="10 users included" />
                <ListItem icon={<CheckCircleOutline />} text="2GB of storage" />
                <ListItem icon={<CheckCircleOutline />} text="Email support" />
                <ListItem icon={<CheckCircleOutline />} text="Help center access" />
              </ul>
              <Button
                href="#"
                className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                Get Started
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubscriptionPlans;

// Helper component to render list items with icons
const ListItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <li className="flex items-center gap-1">
    {icon}
    <span className="text-gray-700">{text}</span>
  </li>
);
