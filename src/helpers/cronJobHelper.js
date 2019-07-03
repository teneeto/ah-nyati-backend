import cron from 'node-cron';
import Sequelize from 'sequelize';
import { Blacklist } from '../db/models';


export const findAndDeactivateAllExpiredToken = async (res) => {
  const { Op } = Sequelize;
  const date = new Date();
  const expiredDate = date.setDate(date.getDate() - 1);

  try {
    const updatedRows = await Blacklist.update(
      {
        isActive: false
      },
      {
        where: {
          createdAt: {
            [Op.lte]: expiredDate
          }
        }
      }
    );
    return updatedRows;
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'problem deleteting expired token',
    });
  }
};

const eraseExpiredToken = () => {
  cron.schedule('0 0 * * *', () => {
    findAndDeactivateAllExpiredToken();
  });
};

export default eraseExpiredToken;
