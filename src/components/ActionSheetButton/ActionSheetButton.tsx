import React, {FC} from 'react';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {TouchableOpacity, Text} from 'react-native';
import styles from './ActionSheetButton.styles';

type ValueType = number | string;

interface ActionSheetButtonProps {
  items: ItemProps[];
  onChangeValue: (value: ValueType) => void;
  value: ValueType;
}

interface ItemProps {
  value: ValueType;
  label: string;
}

const ActionSheetButton: FC<ActionSheetButtonProps> = ({
  onChangeValue,
  items,
  value,
}) => {
  const {showActionSheetWithOptions} = useActionSheet();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        showActionSheetWithOptions(
          {options: items.map(item => item.label)},
          index => onChangeValue(items[index].value),
        )
      }>
      <Text style={styles.text}>
        {items.find(item => item.value === value)?.label}&nbsp;
      </Text>
    </TouchableOpacity>
  );
};

export default ActionSheetButton;
