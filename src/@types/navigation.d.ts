import { PlantProps } from "../lib/storage";
import { ConfirmationParams } from "../screens/Confirmation";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Welcome: undefined;
      UserIdentification: undefined;
      Confirmation: ConfirmationParams,
      PlantSelect: undefined;
      PlantSave: {
        plant: PlantProps
      };
      MyPlants: undefined;
    }
  }
}
