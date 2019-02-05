import React from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { DropzoneArea } from 'material-ui-dropzone';
import ImagesCollection from '../../api/ImagesCollection.js';


type Props = {
  imgUrl?: string,
  name?: string,
  vehicleClass?: string,
  passengers?: number,
  luggage?: number,
  price?: number,
  setVehicle: Function,
};


class VehicleForm extends React.Component<Props> {
  static defaultProps = {
    imgUrl: '',
    name: '',
    vehicleClass: 'standard',
    passengers: 0,
    luggage: 1,
    price: 9,
  };

  state = {
    uploading: false,
    fileUploadProgress: 0,
    vehicleClass: '',
  };

  constructor(props) {
    super(props);

    const { price, vehicleClass } = props;
console.log(props);
    this.state.price = price;
    this.state.vehicleClass = vehicleClass;
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const { setVehicle } = this.props;
    const { currentTarget } = event;
    const {
      name,
      vehicleClass,
      passengers,
      luggage,
      price,
    } = currentTarget;

    const newVehicle = {
      // imgUrl: name.value,
      name: name.value,
      vehicleClass: vehicleClass.value,
      passengers: passengers.value,
      luggage: luggage.value,
      price: price.value,
    };

    setVehicle(newVehicle);
  };

  handleDropzone = (files) => {
    const upload = ImagesCollection.insert({
      file: files[0],
      streams: 'dynamic',
      chunkSize: 'dynamic',
    }, false);

    upload.on('start', () => {
      this.setState({ uploading: true });
    });

    upload.on('progress', (progress) => {
      this.setState({ fileUploadProgress: progress });
    });

    upload.on('end', (error, fileObj) => {
      if (error) {
        console.log('error uploading image', error);
      } else {
        console.log('file successfully uploaded', fileObj);
      }

      this.setState({ uploading: false });
    });

    upload.start();
  };


  handleVehicleClassChange = (event) => {
    const { currentTarget } = event;
    const { dataset } = currentTarget;

    this.setState({ vehicleClass: dataset.value });
  };


  render() {
    const {
      uploading,
      fileUploadProgress,
      price,
      vehicleClass,
    } = this.state;

    const {
      imgUrl,
      name,
      passengers,
      luggage,
    } = this.props;

    const vehicleClasses = [{
      label: 'Economy',
      value: 'economy',
    }, {
      label: 'Standard',
      value: 'standard',
    }, {
      label: 'Executive',
      value: 'executive',
    }];

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="row">
          <div className="col-sm-4">
            {imgUrl ? (
              <img src={imgUrl} alt="Uploaded vehicle" />
            ) : (
              <div>
                <DropzoneArea onChange={this.handleDropzone} />
                {uploading && (
                  <div>
                    Uploading:&nbsp;
                    {fileUploadProgress}
                    %
                    <img src="" alt="Uploading" />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-6 mb-3">
                <TextField
                  type="text"
                  name="name"
                  defaultValue={name}
                  placeholder="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-sm-6 mb-3">
                <Select
                  inputProps={{
                    name: 'vehicleClass',
                    placeholder: 'class',
                  }}
                  value={vehicleClass}
                  onChange={this.handleVehicleClassChange}
                  label="Class"
                  fullWidth
                >
                  {vehicleClasses.map(theVehicleClass => (
                    <MenuItem key={theVehicleClass.value} value={theVehicleClass.value}>
                      {theVehicleClass.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="col-sm-6 mb-3">
                <TextField
                  type="number"
                  name="passengers"
                  defaultValue={passengers}
                  label="Passengers"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-sm-6 mb-3">
                <TextField
                  type="number"
                  name="luggage"
                  defaultValue={luggage}
                  placeholder="luggage"
                  label="luggage"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-sm-6 mb-3">
                <TextField
                  type="text"
                  name="price"
                  value={price}
                  onChange={newPrice => this.setState({ price: newPrice.currentTarget.value })}
                  placeholder="price"
                  label="price"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-sm-12 mb-3">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add new
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default VehicleForm;
