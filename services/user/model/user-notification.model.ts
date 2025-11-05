// @Entity()
// export class UserNotification {
//   @PrimaryGeneratedColumn()
//   id: number;
import { UserNotificationTypeEnum } from '@/shared/enum/user';

import { UserAccountModel } from './user-account.model';

//   @Column({ type: 'varchar', length: 36 })
//   @Generated('uuid')
//   uuid: string;

//   @Column({ type: 'tinyint', enum: UserNotificationTypeEnum })
//   userNotificationType: UserNotificationTypeEnum;

//   @Column({ type: 'varchar', length: 255 })
//   message: string;

//   @Column({ type: 'boolean', default: false })
//   isRead: boolean;

//   @CreateDateColumn({ type: 'timestamp' })
//   createdAt: Date;

//   @Exclude()
//   @Column()
//   userAccountId: number;

//   @ManyToOne(() => UserAccount, (userAccount) => userAccount.userNotifications, {
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'userAccountId' })
//   userAccount: UserAccount;
// }

export interface UserNotificationModel {
  id: number;
  uuid: string;
  userNotificationType: UserNotificationTypeEnum;
  message: string;
  isRead: boolean;
  createdAt: Date;

  userAccount: UserAccountModel;
}
