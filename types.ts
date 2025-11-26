export interface BotanicalData {
  name: string;
  scientificName: string;
  description: string;
  family: string;
  toxicity: string;
  uses: string[];
}

export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  DOCS = 'DOCS'
}