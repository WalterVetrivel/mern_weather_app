import React from 'react';
import Backdrop from './Backdrop';

const Modal = ({ title, children, btnLabel, showBtn, btnClick, onDismiss }) => (
	<>
		<Backdrop />
		<div className='modal'>
			<div className='modal__header'>
				<h3 className='modal__title'>{title}</h3>
				<button className='modal__dismiss' onClick={onDismiss}>
					X
				</button>
			</div>
			<div className='modal__body'>{children}</div>
			{showBtn ? (
				<button className='btn btn--primary modal__btn' onClick={btnClick}>
					{btnLabel}
				</button>
			) : null}
		</div>
	</>
);

export default Modal;
