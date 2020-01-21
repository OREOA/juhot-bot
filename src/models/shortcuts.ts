import {Model, Column, Table} from "sequelize-typescript"

@Table
export class Shortcut extends Model<Shortcut> {

  @Column
  shortcode!: string;

  @Column
  sticker!: string;
}


export default Shortcut