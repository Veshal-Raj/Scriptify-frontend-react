import React from 'react';
import { Typography, Link, Grid, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, GitHub } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#fff', padding: '4rem 1rem' }}>
      <div style={{ margin: 'auto', maxWidth: 'screen-xl', textAlign: 'center' }}>
        <Typography variant="h4" component="strong" gutterBottom>
          Want us to email you with the latest blockbuster blogs?
        </Typography>

        <form style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
            <label htmlFor="email" style={{ display: 'none' }}>Email</label>
            <input
              style={{ width: '100%', maxWidth: '300px', borderRadius: '9999px', border: '1px solid #e5e7eb', backgroundColor: '#f3f4f6', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '500', boxSizing: 'border-box' }}
              id="email"
              type="email"
              placeholder="john@doe.com"
            />
            <button style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', borderRadius: '9999px', backgroundColor: '#2563EB', color: '#fff', padding: '0.75rem 1.25rem', fontSize: '0.875rem', fontWeight: '500', transition: 'background-color 0.3s', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </form>

        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '2.5rem' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" style={{ color: '#6b7280' }}>
              Stay ahead of the curve with the latest in tech trends and coding insights. <br />
              Explore advanced techniques, tackle challenging problems, <br />
              and dive deep into the world of software development.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <IconButton href="/" target="_blank" rel="noreferrer">
                  <Facebook />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href="/" target="_blank" rel="noreferrer">
                  <Instagram />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href="/" target="_blank" rel="noreferrer">
                  <Twitter />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href="/" target="_blank" rel="noreferrer">
                  <GitHub />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div style={{ marginTop: '2.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          <Typography variant="body2" style={{ color: '#6b7280' }}>
            © Scriptify 2024. All rights reserved.
            <br />
            Created by <Link href="https://github.com//Veshal-Raj" target='_blank' style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.3s' }}>Veshal Raj</Link>
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
