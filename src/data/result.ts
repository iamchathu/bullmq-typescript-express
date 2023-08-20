export enum JobStatus {
  DONE,
  FAILED,
}

export class ResultData {
  constructor(public id: string, public status: JobStatus) {}
}
