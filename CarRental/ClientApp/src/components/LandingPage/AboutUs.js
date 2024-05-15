import React, { Component } from 'react';

export class AboutUs extends Component {
  static displayName = AboutUs.name;

  render() {
    return (
      <div>
        <h1>About Us</h1>

        <p>Front-end: Marcin Kuśnierz</p>

        <p>Back-end: Michał Mrowiec</p>

      </div>
    );
  }
}
