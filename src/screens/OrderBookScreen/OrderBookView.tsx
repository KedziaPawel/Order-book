import React, {FC} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {PriceSizeItemWithTotal} from '@app/types';
import {ActionSheetButton} from '@app/components';
import theme from '@app/theme';
import {renderItem} from './renderItem';
import styles from './OrderBook.styles';

const {colors} = theme;

interface Props {
  toggleFeed: () => void;
  currentTicketSize: number;
  availableTicketSizes: {value: number; label: string}[];
  setTicketSize: (size: number) => void;
  killFeed: () => void;
  asks: PriceSizeItemWithTotal[];
  bids: PriceSizeItemWithTotal[];
  connectionError: string;
}

const SectionHeader = () => (
  <View style={styles.sectionHeader}>
    <View style={styles.columnContainer}>
      <Text style={styles.itemText}>PRICE</Text>
    </View>
    <View style={styles.columnContainer}>
      <Text style={styles.itemText}>SIZE</Text>
    </View>
    <View style={styles.columnContainer}>
      <Text style={styles.itemText}>TOTAL</Text>
    </View>
  </View>
);

const INITIAL_NUMBER_TO_RENDER_ON_FLAT_LIST = 15;

const OrderBookView: FC<Props> = ({
  asks,
  bids,
  currentTicketSize,
  toggleFeed,
  setTicketSize,
  availableTicketSizes,
  connectionError,
  killFeed,
}) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.orderBookText}>Order Book</Text>
      <ActionSheetButton
        items={availableTicketSizes}
        onChangeValue={value => setTicketSize(Number(value))}
        value={currentTicketSize}
      />
    </View>
    <SectionHeader />
    <View style={styles.contentContainer}>
      {connectionError ? (
        <Text style={styles.errorText}>{connectionError}</Text>
      ) : (
        <>
          <View style={styles.flatListContainer}>
            <FlatList
              data={asks}
              initialNumToRender={INITIAL_NUMBER_TO_RENDER_ON_FLAT_LIST}
              inverted
              renderItem={({item}) =>
                renderItem({
                  item,
                  totalSizeOfAllItems: asks[asks.length - 1].total,
                  textColor: colors.lightGreen,
                  backgroundColor: colors.darkGreen,
                })
              }
              keyExtractor={item => item.price.toString()}
            />
          </View>
          <View style={styles.separatorContainer} />
          <View style={styles.flatListContainer}>
            <FlatList
              data={bids}
              initialNumToRender={INITIAL_NUMBER_TO_RENDER_ON_FLAT_LIST}
              renderItem={({item}) =>
                renderItem({
                  item,
                  totalSizeOfAllItems: bids[bids.length - 1].total,
                  textColor: colors.lightRed,
                  backgroundColor: colors.darkRed,
                })
              }
              keyExtractor={item => item.price.toString()}
            />
          </View>
        </>
      )}
    </View>

    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[styles.button, styles.buttonToggle]}
        onPress={toggleFeed}>
        <Text style={styles.buttonText}>Toggle Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonKill]}
        onPress={killFeed}>
        <Text style={styles.buttonText}>
          {connectionError ? 'Fix Feed' : 'Kill Feed'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default OrderBookView;
