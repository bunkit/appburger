import React, { useEffect} from 'react';
import Aux from '../../../hoc/Aux';
import classes from './Modal.module.css'
import BackDrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    useEffect(() => {
        console.log('[modal.js] useEffect');
    }, [props.show]);
      return (
          <Aux>
              <BackDrop show={props.show} clicked={props.modalClosed} />
              <div 
                  className={classes.Modal}
                  style={{
                      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                      opacity: props.show ? 1 : 0,
                  }}
                  >
                  {props.children}
              </div>
          </Aux>
      )
}

export default React.memo(Modal,(prevProps, nextProps) => prevProps.show === nextProps.show);
