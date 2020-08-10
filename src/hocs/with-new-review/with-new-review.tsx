import * as React from 'react';
import {Subtract} from "utility-types";


interface State {
  reviewRating: number | null;
  reviewText: string | null,
}

interface InjectingProps {
  reviewRating: number | null;
  reviewText: string | null;
  onChange: () => {};
};


export const withNewReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithNewReview extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        reviewRating: null,
        reviewText: null,
      };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newRating, newText) {
      this.setState({
        reviewRating: newRating,
        reviewText: newText,
      });
    }

    render() {
      const {reviewRating, reviewText} = this.state;

      return <Component
        {...this.props}
        reviewRating={reviewRating}
        reviewText={reviewText}
        onChange={this.handleChange}
      />;
    }
  }


  return WithNewReview;
};
