import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

/**
 * A React component that shows the about us page.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [content, setContent] = useState({ img: '', text: [] })
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A nested function that fetches content from the back-end server.
   */
  const fetchContent = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus/content`)
      .then(response => {
        // axios bundles up all response data in response.data property
        setContent({
          img: `${process.env.REACT_APP_SERVER_HOSTNAME}${response.data.image}`,
          text: response.data.text,
        })
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch content once
    fetchContent()
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Us</h1>

      <div className="aboutus">
        {error && <p className="aboutUs-error">{error}</p>}
        {!loaded && <img src={loadingIcon} alt="loading" />}

        {loaded && <img src={content.img} alt="myself" />}
        {content.text.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
