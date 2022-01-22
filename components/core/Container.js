import PropTypes from 'prop-types'
import styles from '../../styles/Container.module.css'

const Container = ({ children, customStyle }) => {
  return (
    <div className={styles['container']} style={customStyle}>
      {children}
    </div>

  )
}

Container.propTypes = {
  children: PropTypes.any.isRequired,
  customStyle: PropTypes.any.isRequired
}
export default Container
