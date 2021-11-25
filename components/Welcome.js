const Welcome = () => {
    return (
      <div>
          <h1>What Are You?</h1>
        <div>
          <label typy='text'>Admin</label>
          <button>Login As Admin</button>
        </div>
        <div>
          <label type='text'>Baristas</label>
          <button>Login As Baristas</button>
        </div>
        <div>
          <label type='text'>Clients</label>
          <button>Login As Clients</button>
        </div>
      </div>
    );
  };

  export default Welcome;