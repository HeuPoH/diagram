export type IScene = {
  id: string;
  choiceIds: string[];
} & ISceneInfo;

export type ISceneInfo = {
  title: string;
  description: string;
}

export type IChoice = { id: string } & IChoiceInfo;

export type IChoiceInfo = {
  title: string;
  description: string;
  from: string;
  to: string;
};

export type State = { 
  scenes: Record<string, IScene>;
  choices: Record<string, IChoice>;
};
