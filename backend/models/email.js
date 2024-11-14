module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define('Email', {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    return Email;
  };
  