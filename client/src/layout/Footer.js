import React from 'react'
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
        {/* Footer */}
        <Segment inverted vertical style={{ width: '100%', textAlign: 'center', marginTop: '20px', padding: '30px', backgroundColor: '#282c34' }}>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header inverted as='h3'>About Us</Header>
              <p>
                Snapstore is your premier destination for high-quality photography. Our team of photographers and artists is passionate about delivering stunning visuals that resonate with your audience.
              </p>
              <Link to="/about-us">
                <Button color='green'>Learn More</Button>
              </Link>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header inverted as='h3'>Contact Us</Header>
              <p>Email: moringaGroup6@photostore.com</p>
              <p>Phone: 0790224262</p>
              <Link to="/contact-form">
                <Button color='blue'>Contact Form</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#a0a0a0' }}>&copy; 2024 PHOTOSTORE. All rights reserved.</p>
      </Segment>
    </div>
  )
}