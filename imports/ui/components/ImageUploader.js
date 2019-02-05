import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import ImagesCollection from '../../api/ImagesCollection.js';
// import { Meteor } from 'meteor/meteor';

type Props = {
  imgUrl?: string,
  setImgUrl: Function,
};

class ImageUploader extends React.Component<Props> {
  state = {
    isUploading: false,
    fileUploadProgress: 0,
  }

  static defaultProps = {
    imgUrl: '',
  }


  handleDropzone = (files) => {
    const { setImgUrl } = this.props;
    const upload = ImagesCollection.insert({
      file: files[0],
      streams: 'dynamic',
      chunkSize: 'dynamic',
    }, false);

    upload.on('start', () => {
      this.setState({ isUploading: true });
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

      this.setState({
        isUploading: false,
      });

      setImgUrl(fileObj);
    });

    upload.start();
  };


  render() {
    const { imgUrl } = this.props;
    const {
      isUploading,
      fileUploadProgress,
    } = this.state;

    return (
      <div>
        {imgUrl ? (
          <img src={imgUrl} alt="Uploaded vehicle" />
        ) : (
          <div>
            <DropzoneArea onChange={this.handleDropzone} />
            {isUploading && (
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
    );
  }
}

export default ImageUploader;
