import React from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

function CheckIcon() {
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
      >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function PricingCard() {
  const handleClick = () => {
    navigate('/sign-in')
  }

  const  navigate =  useNavigate()
  return (
    <motion.div className="w-full max-w-[20rem] p-8 md:m-8 sm:mt-5 rounded-xl" style={{ background: 'linear-gradient(to right, #080a52, #0a0d6c)', transition: 'transform 0.3s' }}
      whileHover={{scale: 1.05 }}
      >
      <div className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center">
        <Typography variant="subtitle2" color="white" className="font-normal uppercase">
          Monthly
        </Typography>
        <Typography variant="h1" color="white" className="mt-6 flex justify-center gap-1 text-7xl font-normal">
          <span className="mt-2 text-4xl">$</span>10{' '}
          <span className="self-end text-4xl">/mo</span>
        </Typography>
      </div>
      <div className="p-0">
        <List className="flex flex-col gap-4">
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon style={{ color: 'white' }} />
            </span>
            <ListItemText primary={<Typography className="font-normal" style={{ color: 'white' }}>5 team members</Typography>} />
          </ListItem>
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon style={{ color: 'white' }} />
            </span>
            <ListItemText primary={<Typography className="font-normal" style={{ color: 'white' }}>200+ components</Typography>} />
          </ListItem>
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon style={{ color: 'white' }} />
            </span>
            <ListItemText primary={<Typography className="font-normal" style={{ color: 'white' }}>40+ built-in pages</Typography>} />
          </ListItem>
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon style={{ color: 'white' }} />
            </span>
            <ListItemText primary={<Typography className="font-normal" style={{ color: 'white' }}>1 year free updates</Typography>} />
          </ListItem>
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon style={{ color: 'white' }} />
            </span>
            <ListItemText primary={<Typography className="font-normal" style={{ color: 'white' }}>Life time technical support</Typography>} />
          </ListItem>
        </List>
      </div>
      <div className="mt-12 p-0">
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: '#080a52', color: 'white' }}
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          fullWidth={true}
          onClick={handleClick}

        >
          Buy Now
        </Button>
      </div>
    </motion.div>
  );
}
export function SecondPricingCard() {
  const  navigate =  useNavigate()
  const handleClick = () => {
    navigate('/sign-in')
  }
  return (
    <motion.div
      className="w-full max-w-[20rem] p-8 md:m-8 md:mt-[1.5rem] rounded-xl  "
      style={{ background: 'linear-gradient(to right, #080a52, #0a0d6c)' }}
      whileHover={{scale: 1.05 }}
    >
      <div className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center">
        <Typography variant="subtitle2" color="white" className="font-normal uppercase">
          Annually
        </Typography>
        <Typography variant="h1" color="white" className="mt-6 flex justify-center gap-1 text-7xl font-normal">
          <span className="mt-2 text-4xl">$</span>110{' '}
          <span className="self-end text-4xl">/yr</span>
        </Typography>
      </div>
      <div className="p-0">
        <List className="flex flex-col gap-4">
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <ListItemText primary={<Typography className="font-normal" color="white">10 team members</Typography>} />
          </ListItem>
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <ListItemText primary={<Typography className="font-normal" color="white">300+ components</Typography>} />
          </ListItem>
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <ListItemText primary={<Typography className="font-normal" color="white">60+ built-in pages</Typography>} />
          </ListItem>
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <ListItemText primary={<Typography className="font-normal" color="white">2 years free updates</Typography>} />
          </ListItem>
          <ListItem className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <ListItemText primary={<Typography className="font-normal" color="white">Life time technical support</Typography>} />
          </ListItem>
        </List>
      </div>
      <div className="mt-12 p-0">
      <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: '#080a52', color: 'white' }}
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          fullWidth={true}
          onClick={handleClick}
        >
          Buy Now
        </Button>
      </div>
    </motion.div>
  );
}

