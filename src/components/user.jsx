function User({ user }) {
  return (
    <div className="person">
      <h3>{user.name}</h3>
      <span>{user.email}</span>
    </div>
  );
}

export default User;
