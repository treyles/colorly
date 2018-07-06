import React from 'react';

export default class Icon extends React.Component {
  render() {
    const { icon, color } = this.props;

    const svg = {
      logo: () => (
        <svg
          width="38px"
          height="16px"
          viewBox="0 0 38 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Welcome"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="Desktop" transform="translate(-146.000000, -46.000000)">
              <circle id="Oval-3" fill="#FE7751" cx="154" cy="54" r="8" />
              <circle
                id="Oval-3-Copy-2"
                fill="#A4D3DA"
                style={{ mixBlendMode: 'multiply' }}
                cx="165"
                cy="54"
                r="8"
              />
              <circle
                id="Oval-3-Copy"
                fill="#FFB20E"
                style={{ mixBlendMode: 'multiply' }}
                cx="176"
                cy="54"
                r="8"
              />
            </g>
          </g>
        </svg>
      ),

      upload: () => (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="92px"
          height="92px"
          viewBox="0 0 92 92"
          enableBackground="new 0 0 92 92"
          xmlSpace="preserve"
        >
          <path
            id="XMLID_1228_"
            d="M92,51.5c-0.6,8.7-7.4,18.2-20.7,18.2c-6.1,0-9.3,0-9.3,0c-2.2,0-4-1.7-4-3.9c0-2.2,1.8-3.8,4-3.8
	c0,0,0,0,0,0c0,0,3.2-0.2,9.3-0.2c8.3,0,12.4-5.6,12.8-10.9c0.4-5.5-3.1-11.6-11.6-12.8c-1.1-0.2-2.1-0.8-2.7-1.7
	c-0.6-0.9-0.8-2.1-0.6-3.2c1.1-4.7-0.1-8.4-3.2-10.1c-2.6-1.5-6.8-1.4-10.2,1.9c-0.9,0.9-2.2,1.3-3.4,1.1c-1.2-0.2-2.3-1-2.9-2.1
	c-5.8-10.9-14.7-11.4-20.6-8.6c-5.7,2.7-10.2,9.4-6.7,17.9c0.4,1,0.4,2.2-0.1,3.2c-0.5,1-1.4,1.8-2.4,2.1
	C7.5,42.3,7.8,50.3,8.1,52.7c0.7,4.4,4.2,8.9,9.6,8.9l12.5,0.1c2.2,0,4,1.9,4,4.1c0,2.2-1.8,4.2-4,4.2c0,0,0,0,0,0l-12.4-0.3
	c-8.8,0-16.1-6.8-17.5-15.9c-1.1-7,1.9-16.4,13.1-21.4c-2.6-11,3.6-20.3,12-24.2c8.6-4.1,20.7-2.9,28.7,8.2c5-2.8,10.9-3,15.8-0.2
	c4.2,2.4,8,7.4,7.6,14.9C88.1,34.3,92.5,43.5,92,51.5z M60.1,54.8c0.8,0.8,1.8,1.2,2.8,1.2c1,0,2-0.4,2.8-1.2c1.6-1.6,1.6-4.1,0-5.7
	l-16.9-17C48.1,31.4,47.1,31,46,31c-1.1,0-2.1,0.4-2.8,1.2l-16.9,17c-1.6,1.6-1.6,4.1,0,5.7c1.6,1.6,4.1,1.6,5.7,0L42,44.6L42.1,82
	c0,2.2,1.8,4,4,4c0,0,0,0,0,0c2.2,0,4-1.8,4-4L50,44.7L60.1,54.8z"
          />
        </svg>
      ),

      upload2: () => (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="92px"
          height="92px"
          viewBox="0 0 92 92"
          enableBackground="new 0 0 92 92"
          xmlSpace="preserve"
        >
          <path
            id="XMLID_1346_"
            d="M89,58.8V86c0,2.8-2.2,5-5,5H8c-2.8,0-5-2.2-5-5V58.8c0-2.8,2.2-5,5-5s5,2.2,5,5V81h66V58.8
	c0-2.8,2.2-5,5-5S89,56,89,58.8z M29.6,29.9L41,18.2v43.3c0,2.8,2.2,5,5,5s5-2.2,5-5V18.3l11.4,11.6c1,1,2.3,1.5,3.6,1.5
	c1.3,0,2.5-0.5,3.5-1.4c2-1.9,2-5.1,0.1-7.1L49.6,2.5C48.6,1.5,47.3,1,46,1c-1.3,0-2.6,0.5-3.6,1.5L22.5,22.9
	c-1.9,2-1.9,5.1,0.1,7.1C24.5,31.9,27.7,31.8,29.6,29.9z"
          />
        </svg>
      )
    };

    return svg[icon]();
  }
}
