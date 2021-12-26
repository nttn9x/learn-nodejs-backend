import { model, Schema } from "mongoose";

export interface IOrganization {
  name: string;
}
const schema = new Schema<IOrganization>({
  name: { type: String, required: true },
});

const OrganizationModel = model<IOrganization>("Organization", schema);

export default OrganizationModel;
