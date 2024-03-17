import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { UserData } from './UserData';

const items = [
  {
    id: 1,
    altText: 'Slide 1',
    caption: 'Jakaś reklama będzie se tutaj',
  },
  {
    id: 2,
    altText: 'Slide 2',
    caption: 'Tutaj będzie se kolejna raklama',
  },
  {
    id: 3,
    altText: 'Slide 3',
    caption: 'Gdyby było mało reklam to tutaj będzie jeszcze jedna',
  },
];

class User extends Component {
  constructor(props) {
    super(props);
        this.state = {
        activeIndex: 0,
        animating: false,
        dateOfBirth: '',
        gender: '',
        street: '',
        houseNumber: '',
        apartmentNumber: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
    };
  }

  next = () => {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.state.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={() => this.setState({ animating: true })}
          onExited={() => this.setState({ animating: false })}
        >
          <CarouselCaption
            className="text-danger"
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {`.custom-tag {
              max-width: 100%;
              height: 200px;
            }`}
        </style>
        <Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous}>
          <CarouselIndicators
            items={items}
            activeIndex={this.state.activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        <div className='d-flex flex-column vh-100'>
            <h2>Konto</h2>
            <UserData/>
        </div>
      </div>
    );
  }
}

export default User;
