import React from 'react';
import BookingForm from '../components/BookingForm.js';
import { loadGoogle } from '../functions/functions.js';


class App extends React.Component<{}> {
  constructor(props) {
    super(props);
    loadGoogle();
  }


  render() {
    return (
      <div>
        <BookingForm />
      </div>
    );
  }
}

export default App;
