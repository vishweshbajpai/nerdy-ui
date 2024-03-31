import { Handle, Position, useReactFlow } from "reactflow";
import { Button, message } from "antd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  broken,
  destination,
  formSource,
  loginForm,
  signupForm,
  ninja,
  treasureKey,
  celebrate,
} from "../../recoil/atom";
import DisconnectedIcon from "../../assets/icons/DisconnectedIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LoginPayload,
  SignupPayload,
  UpdateLevelsPayload,
  loginService,
  signupService,
  updateLevelsOfUserService,
} from "../../services";
import {
  FieldNames,
  HiddenKeys,
  LocalStorageKeys,
  NodeIds,
  ReactQueryKeys,
} from "../../utils/enum";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ILoginResponse, IUserDetails } from "../../types";
import {
  ButtonLabels,
  fitToView,
  hideAllLevels,
  updateLevels,
} from "../helper";
import { getUserBirthYear, isBinaryNumber } from "../../utils/common";

const CommonButton = () => {
  const queryClient = useQueryClient();
  const reactFlow = useReactFlow();
  const [getValue, setValue] = useLocalStorage();
  const signUpMutation = useMutation({ mutationFn: signupService });
  const loginMutation = useMutation({ mutationFn: loginService });
  const updateLevelsMutation = useMutation({
    mutationFn: updateLevelsOfUserService,
  });
  const signupFormData = useRecoilValue(signupForm);
  const loginFormData = useRecoilValue(loginForm);
  const destinationValue = useRecoilValue(destination);
  const brokenValue = useRecoilValue(broken);
  const ninjaValue = useRecoilValue(ninja);
  const treasureKeyValue = useRecoilValue(treasureKey);
  const setCelebrateValue = useSetRecoilState(celebrate);
  const [formSourceValue, setFormSourceValue] = useRecoilState(formSource);
  const userDetails: IUserDetails = getValue(
    LocalStorageKeys.userDetails
  ) as IUserDetails;
  const audio = new Audio("/BlingBangBangBornAudio.mp3");

  const removeAllEdges = () => {
    reactFlow.setEdges([]);
    setFormSourceValue(null);
  };

  const signUpHandler = async () => {
    try {
      const values: Record<FieldNames, any> =
        await signupFormData.formInstance?.validateFields();
      const payload: SignupPayload = {
        name: values.name,
        email: values.email,
        password: values.password,
        age: Number(values.age),
        city: values.city,
      };
      signUpMutation.mutate(payload, {
        onSuccess: (res) => {
          const data: ILoginResponse = res.data;
          setValue(LocalStorageKeys.token, data.token);
          setValue(LocalStorageKeys.userDetails, data.userDetails);
          removeAllEdges();
          hideAllLevels(reactFlow);
          queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.Levels],
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loginHandler = async () => {
    try {
      const values: Record<FieldNames, any> =
        await loginFormData.formInstance?.validateFields();
      const payload: LoginPayload = {
        email: values.email,
        password: values.password,
      };
      loginMutation.mutate(payload, {
        onSuccess: (res) => {
          const data: ILoginResponse = res.data;
          setValue(LocalStorageKeys.token, data.token);
          setValue(LocalStorageKeys.userDetails, data.userDetails);
          removeAllEdges();
          hideAllLevels(reactFlow);
          queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.Levels],
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const journeyClickHandler = () => {
    try {
      if (
        !destinationValue ||
        destinationValue.trim().toLowerCase() !==
          HiddenKeys.TREASURE_ISLAND.toLowerCase()
      ) {
        message.error("Wrong");
        return;
      }
      const payload: UpdateLevelsPayload = {
        userId: userDetails.id,
        level: Number(NodeIds.broken),
      };
      updateLevelsMutation.mutate(payload, {
        onSuccess: () => {
          removeAllEdges();
          updateLevels([NodeIds.broken], reactFlow);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const brokenClickHandler = () => {
    try {
      if (
        !brokenValue ||
        brokenValue.trim().toLowerCase() !== HiddenKeys.GHOOMAR.toLowerCase()
      ) {
        message.error("Wrong");
        return;
      }
      const payload: UpdateLevelsPayload = {
        userId: userDetails.id,
        level: Number(NodeIds.ninja),
      };
      updateLevelsMutation.mutate(payload, {
        onSuccess: () => {
          removeAllEdges();
          updateLevels([NodeIds.ninja], reactFlow);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const ninjaClickHandler = () => {
    try {
      if (isBinaryNumber(ninjaValue)) {
        message.error("I don't understand Binary");
        return;
      }
      if (
        !ninjaValue ||
        ninjaValue.trim() !== getUserBirthYear(userDetails.age)?.toString()
      ) {
        message.error("Wrong");
        return;
      }
      const payload: UpdateLevelsPayload = {
        userId: userDetails.id,
        level: Number(NodeIds.treasure),
      };
      updateLevelsMutation.mutate(payload, {
        onSuccess: () => {
          removeAllEdges();
          updateLevels([NodeIds.treasure], reactFlow);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const treasureClickHandler = () => {
    try {
      const parts = treasureKeyValue.split(".");
      if (parts.length === 3) {
        message.error("It's a JWT, decrypt it");
        return;
      }
      if (
        !treasureKeyValue ||
        treasureKeyValue.trim().toLowerCase() !== HiddenKeys.LOVE.toLowerCase()
      ) {
        message.error("Wrong");
        return;
      }
      const payload: UpdateLevelsPayload = {
        userId: userDetails.id,
        level: Number(NodeIds.winner),
      };
      updateLevelsMutation.mutate(payload, {
        onSuccess: () => {
          removeAllEdges();
          updateLevels([NodeIds.winner], reactFlow);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const winnerClickHandler = () => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    setCelebrateValue(true);
    message.success(`Congratulations ${userDetails.name}!`);
    const nodeIds = reactFlow.getNodes().map((node) => ({
      id: node.id,
    }));
    fitToView(nodeIds, reactFlow, 5000);
  };

  const clickHandler = async () => {
    if (!formSourceValue) return;
    if (formSourceValue === NodeIds.signup) {
      signUpHandler();
    } else if (formSourceValue === NodeIds.login) {
      loginHandler();
    } else if (formSourceValue === NodeIds.journey) {
      journeyClickHandler();
    } else if (formSourceValue === NodeIds.broken) {
      brokenClickHandler();
    } else if (formSourceValue === NodeIds.ninja) {
      ninjaClickHandler();
    } else if (formSourceValue === NodeIds.treasure) {
      treasureClickHandler();
    } else if (formSourceValue === NodeIds.winner) {
      winnerClickHandler();
    }
  };

  return (
    <>
      <Button
        className={`h-[80px] w-[300px] flex justify-center items-center rounded-full text-center font-bold text-white focus:outline-none border-2 border-[#1677ff] text-3xl shadow-2xl shadow-black transition-all duration-500 ${
          formSourceValue ? "bg-[#1677ff] hover:bg-slate-900" : "cursor-no-drop"
        }`}
        onClick={clickHandler}
        loading={loginMutation.isPending || signUpMutation.isPending}
      >
        {!formSourceValue ? (
          <DisconnectedIcon />
        ) : (
          ButtonLabels[formSourceValue]
        )}
      </Button>
      <Handle
        type="target"
        position={Position.Top}
        isConnectableStart={false}
        // isConnectable={connectedEdgeId === null}
        className="bg-white"
      />
    </>
  );
};

export default CommonButton;
