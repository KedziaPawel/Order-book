import React from 'react';
import {Text, View, ColorValue} from 'react-native';
import {PriceSizeItemWithTotal} from '@app/types';
import styles from './OrderBook.styles';

export const renderItem = ({
  item,
  totalSizeOfAllItems,
  textColor,
  backgroundColor,
}: {
  item: PriceSizeItemWithTotal;
  totalSizeOfAllItems: number;
  textColor: ColorValue;
  backgroundColor: ColorValue;
}) => (
  <View style={styles.itemContainer}>
    <View
      style={{
        ...styles.progressContainer,
        backgroundColor,
        width: `${(item.total * 100) / totalSizeOfAllItems}%`,
      }}
    />
    <View style={styles.columnContainer}>
      <Text
        style={{
          ...styles.itemText,
          color: textColor,
        }}>
        {item.price.toFixed(2)}
      </Text>
    </View>
    <View style={styles.columnContainer}>
      <Text style={styles.itemText}>{item.size}</Text>
    </View>

    <View style={styles.columnContainer}>
      <Text style={styles.itemText}>{item.total}</Text>
    </View>
  </View>
);
