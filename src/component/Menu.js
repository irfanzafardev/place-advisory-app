import icon from '../asset/arrow-upright.png';
import React from 'react'
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <div className="menu-wrapper">
        <div className="row">
          <div className="col-4 menu-image">
            <img
              src="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
          </div>
          <div className="col-4 menu-image">
            <img
              src="https://images.pexels.com/photos/3277468/pexels-photo-3277468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
          </div>
          <div className="col-4">
            <Link className="menu-item d-flex justify-content-between" to="/form">
              <div className="text align-self-center">Add new place</div>
              <div className="icon">
                <img src={icon} alt="arrow" />
              </div>
            </Link>
            <Link className="menu-item d-flex justify-content-between" to="/post">
              <div className="text align-self-center">See all places</div>
              <div className="icon">
                <img src={icon} alt="arrow" />
              </div>
            </Link>
            <Link className="menu-item d-flex justify-content-between" to="/trash">
              <div className="text align-self-center">Removed Item</div>
              <div className="icon">
                <img src={icon} alt="arrow" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu