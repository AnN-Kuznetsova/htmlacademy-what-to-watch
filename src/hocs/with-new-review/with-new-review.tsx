import * as React, {PureComponent} from 'react';


export const withNewReview = (Component) => {
  class WithNewReview extends PureComponent {
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


  WithNewReview.propTypes = {};


  return WithNewReview;
};
