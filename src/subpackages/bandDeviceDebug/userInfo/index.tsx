import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Picker, View } from '@tarojs/components';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List, MyAlert, MyInput } from '@/components';
import { UserInfoStore } from './index.store';

const genderOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
];

const UserInfo = () => {
  const store = useStore(UserInfoStore);

  useUnregister(store);

  useEffect(() => {
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ padding: '32px 0' }}>
      <List>
        <List.Item title="姓名" onClick={() => store.showEditInput('name')}>
          {store.userInfo?.name}
        </List.Item>
        {/* 性别 */}
        <Picker
          mode="selector"
          rangeKey="label"
          range={genderOptions}
          value={genderOptions.findIndex((item) => item.value === store.userInfo?.gender)}
          onChange={(e) => store.save({ gender: genderOptions[e.detail.value as number].value })}
        >
          <List.Item
            title="性别"
            clickable
            content={genderOptions.find((item) => item.value === store.userInfo?.gender)?.label ?? '请选择'}
          />
        </Picker>
        {/* 身高 */}
        <List.Item
          title="身高"
          content={store.userInfo?.height ?? '请选择'}
          onClick={() => store.showEditInput('height')}
        />
        {/* 体重 */}
        <List.Item
          title="体重"
          content={store.userInfo?.weight ?? '请选择'}
          onClick={() => store.showEditInput('weight')}
        />
        {/* 生日 */}
        <Picker
          mode="date"
          value={store.userInfo?.birthday as string}
          onChange={(e) => store.changeBirthday(e.detail.value)}
        >
          <List.Item title="生日" clickable content={store.userInfo?.birthday} />
        </Picker>
      </List>

      <MyAlert show={store.editInputData.visible} onConfirm={() => store.confirmEditInput()}>
        <MyInput
          type={store.editInputData.inputType}
          value={store.editInputData.value}
          onInput={(e) => store.changeEditInputValue(e.detail.value)}
        />
      </MyAlert>
    </View>
  );
};

export default observer(UserInfo);
