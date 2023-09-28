import './AboutUs.css'
import myself from './myself.jpg'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

const AboutUs = props => {
  return (
    <div className="aboutus">
      <img src={myself} alt="myself" width={'300px'} />
      <p>
        Hi, I am r8btx! <br></br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Enim tortor at
        auctor urna nunc id cursus metus. Scelerisque mauris pellentesque
        pulvinar pellentesque habitant morbi. Ac odio tempor orci dapibus
        ultrices in. Pretium nibh ipsum consequat nisl vel. Felis eget nunc
        lobortis mattis aliquam faucibus purus. Eget dolor morbi non arcu.
        Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc
        sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare
        massa eget. Eu scelerisque felis imperdiet proin fermentum. Est
        ullamcorper eget nulla facilisi etiam dignissim diam.
      </p>
      <p>
        Amet risus nullam eget felis. Pellentesque pulvinar pellentesque
        habitant morbi tristique senectus et. Diam quam nulla porttitor massa id
        neque aliquam vestibulum. Quis ipsum suspendisse ultrices gravida dictum
        fusce. Eget nunc scelerisque viverra mauris in aliquam. Praesent semper
        feugiat nibh sed. Euismod lacinia at quis risus. Adipiscing diam donec
        adipiscing tristique. Semper risus in hendrerit gravida rutrum quisque
        non tellus orci. Nunc lobortis mattis aliquam faucibus purus in massa
        tempor. Risus feugiat in ante metus. Quis enim lobortis scelerisque
        fermentum dui. Nisi scelerisque eu ultrices vitae auctor eu augue ut
        lectus. Nunc id cursus metus aliquam. Turpis nunc eget lorem dolor sed
        viverra. Libero id faucibus nisl tincidunt eget. Dui faucibus in ornare
        quam viverra. Ut diam quam nulla porttitor. Risus quis varius quam
        quisque id diam vel. Consectetur purus ut faucibus pulvinar elementum
        integer enim.
      </p>
    </div>
  )
}

// make this component available to be imported into any other file
export default AboutUs
