import { model, Schema } from "mongoose";

export interface Organization {
  name: string;
}
const schema = new Schema<Organization>({
  name: { type: String, required: true },
});

const OrganizationModel = model<Organization>("Organization", schema);

export default OrganizationModel;
