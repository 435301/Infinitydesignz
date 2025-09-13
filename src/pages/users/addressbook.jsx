import React, { use, useEffect, useState } from 'react';
import '../../css/user/userstyle.css';
import '../../css/user/bootstrap.min.css';
// import Banner from '../../img/banner.png';
import Icon from '../../img/icon.svg';
import Img3 from '../../img/img3.png';
import Star from '../../img/star.svg';
import Star1 from '../../img/star1.svg';
import { Link } from 'react-router-dom';
import Header from '../../includes/header';
import Footer from '../../includes/footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, addAddress, editAddress, deleteAddress, setDefaultAddress } from '../../redux/actions/addressAction';
import '../../css/admin/style.css';
import EditAddressModal from '../../components/editAddressModal';
import DeleteModal from '../../modals/deleteModal';
import AddressModal from '../../components/addAddressModal';
import { toast } from 'react-toastify';

export default function AddressBook() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState('Home');
  const { addresses = [], loading, error } = useSelector((state) => state.addressBook);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const toggleModal = () => setShowModal(!showModal);

  const handleTypeSelect = (type) => setSelectedType(type);

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
    setDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  const handleSetDefault = (id) => {
    dispatch(setDefaultAddress(id));
  };


  return (
    <>
      <Header />
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <Link to="/"><strong>My Account</strong></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container shop">
          <div className="row">
            {/* sidebars */}
            <div className="col-md-2 sidebars">
              <Link to="/profile">Profile</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/addressbook" className="active">Address book</Link>
            </div>

            {/* Main Content */}
            <div className="col-md-7">
              <div className="address-book-container">
                <div className="address-book-header p-3">
                  <h2>Address book</h2>
                  <button className="add-address-btn" onClick={toggleModal}>+ Add Address</button>
                </div>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <p>Loading...</p>
                    </td>
                  </tr>
                ) : (
                  addresses.map((addr) => (
                    <AddressEntry
                      key={addr.id}
                      name={addr.name}
                      addressLines={[
                        addr.flatNumber,
                        addr.buildingName,
                        addr.addressLine1,
                        addr.addressLine2,
                        `${addr.city} - ${addr.pincode}`,
                        addr.state
                      ]}
                      mobile={addr.phone}
                      label={addr.label}
                      isDefault={addr.isDefault || false}
                      onEdit={() => {
                        setSelectedAddress(addr);
                        setEditModalOpen(true);
                      }}
                      onDelete={() => {
                        if (addr.isDefault) {
                          toast.warning("Please set another address as default before deleting this one.");
                          return;
                        }
                        setAddressToDelete(addr);
                        setDeleteModalOpen(true);
                      }}
                      onSetDefault={() => handleSetDefault(addr.id)}
                    />
                  )))}
              </div>
            </div>

            {/* Related Products and Advertisement */}
            <div className="col-md-3">
              {/* <img src={Banner} alt="Special Sale" className="img-fluid" /> */}
              {/* <RelatedProducts /> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Modal Popup */}
      {showModal && <AddressModal selectedType={selectedType} onClose={() => setShowModal(false)} onTypeChange={handleTypeSelect} />}
      {editModalOpen && selectedAddress && (
        <EditAddressModal addressData={selectedAddress} selectedType={selectedAddress.label} onTypeChange={handleTypeSelect} onClose={() => {
          setEditModalOpen(false)
        }}
        />
      )}
      {deleteModalOpen && addressToDelete && (
        <DeleteModal onConfirm={() => handleDelete(addressToDelete.id)} show={deleteModalOpen} onClose={() => {
          setDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        />
      )}
    </>
  );
}

function AddressEntry({ name, addressLines, mobile, label, isDefault = false, onEdit, onDelete, onSetDefault }) {
  return (
    <div className="address-entry p-3">
      {isDefault && <p className="default-address-text"><strong>Default Address</strong></p>}
      <div className={`address-label ${label.toLowerCase()}`}><span>{label}</span></div>
      <div className="address-details">
        <p className="name">{name}</p>
        {addressLines.map((line, idx) => <p key={idx}>{line}</p>)}
        <p>Mobile: {mobile}</p>
      </div>
      <div className="address-actions">
        <div className="action-group">
          <button className="btn action-btn" onClick={onEdit}><i className="bi bi-pencil" ></i> Edit Address</button>
          {!isDefault && (
            <button
              className={`btn action-btn make-default-btn ${isDefault ? 'default-selected' : ''}`}
              onClick={onSetDefault}
              disabled={isDefault}
            >
              <i className="bi bi-check-circle"></i>
              {isDefault ? 'Default Selected' : 'Make it Default'}
            </button>

          )}
        </div>
        <button className="btn action-btn delete-btn" onClick={onDelete}><i className="bi bi-x"></i> Delete Address</button>
      </div>
    </div>
  );
}







