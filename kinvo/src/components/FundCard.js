import React from 'react'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { AirbnbRating } from 'react-native-ratings';

import StatusBadge from './StatusBadge'

import ProfitabilityDisplay from './ProfitabilityDisplay'

import colors from '../util/colors'
import strings from '../util/strings'

export default ({item}) => {
  const {
    name,
    type,
    status,
    rating,
    minimumValue,
    profitability,
  } = item

  return (
    <View style={styles.container}>
      <View 
        style={styles.content}
        opacity={status === 2 ? 0.5 : 1}>
        <View style={styles.header}>
            <Text 
              style={styles.name}
              numberOfLines={2}
              ellipsizeMode="clip">
              {name}
            </Text>
            <Text style={styles.type}>
              {type.toUpperCase()}
            </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={styles.label}>
            {`${strings.rating}:`}
          </Text>
          <AirbnbRating
            showRating={false}
            selectedColor={colors.yellow}
            defaultRating={rating}
            size={17}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            {`${strings.minimumValue}:`}
          </Text>
          <Text style={styles.minimumValue}>
            {`R$${minimumValue}`}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>
            {`${strings.profitability}:`}
          </Text>
          <ProfitabilityDisplay
            profitability={profitability}
          />
        </View>
      </View>
      <View style={styles.statusBadge}>
        <StatusBadge status={status} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    padding: 18,
    borderRadius: 8,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  content: {
    flex: 1
  },
  header: {
    marginRight: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  line: {
    flex: 1,
    backgroundColor: colors.cardBorder,
    height: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 3,
  },
  type: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 20
  },
  label: {
    fontSize: 10,
    color: colors.text
  },
  minimumValue: {
    fontSize: 12,
    color: colors.text
  },
  statusBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: 18,
    marginRight: 18,
  }
})