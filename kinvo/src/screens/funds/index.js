import React, { useEffect } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import {
  View,
  FlatList,
} from 'react-native'

import {
  AntDesign
} from '@expo/vector-icons'

import {
	IconButton
} from 'material-bread'
//Components
import ScreenStateManager from '../../components/ScreenStateManager'
import FundCard from '../../components/FundCard'

import styles from './styles'

import colors from '../../util/colors'
import strings from '../../util/strings'

import { sortAlphabetically } from '../../util/functions'

import { FUNDS_API_ENDPOINT } from '../../util/constants';

//Redux
import { useSelector, useDispatch } from 'react-redux'
import * as UIActions from '../../store/actions/ui'

const axios = require('axios')

const index = ({navigation}) => {
  const funds = useSelector(state => state.ui.funds)

  console.log(funds)
  const dispatch = useDispatch()

  const setFunds = (funds) => {
    dispatch(UIActions.setFunds(funds))
  }

  const setRequestFailed = (resquestFailed) => {
    dispatch(UIActions.setRequestFailed(resquestFailed))
  }

  // useEffect(() => {
  //   getFunds()
  // }, [])

  useFocusEffect(
    React.useCallback(() => {
      getFunds()
    }, [])
  )

  const getFunds = async () => {
    try {
      const response = await axios.get(FUNDS_API_ENDPOINT)

      const {
        success,
        data, 
        error
      } = response.data
      
      if(success && error === null) {
        const orderedFunds = sortAlphabetically(data)
        
        setFunds(orderedFunds)
        setRequestFailed(false)
      } else {
        setRequestFailed(true)
      }
    }catch(error){
      console.log(error)
      setRequestFailed(true)      
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>  (
        <IconButton
          style={styles.headerLeft}
          name={'leftcircle'}
          size={24}
          color={colors.primary}
          iconComponent={AntDesign}
          onPress={() => navigation.goBack()}
        />
      )
    })
  })

  return (
    <ScreenStateManager
      getData={getFunds}
      data={funds}
      noConnectionText={strings.noConnectionFunds}>
        <View style={styles.container}>
          <FlatList
            data={funds}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({item}) => {
              return(
                <FundCard
                  item={item}
                />
              )
            }}
            keyExtractor={fund => fund.id.toString()}
          />
        </View>
    </ScreenStateManager>
  )
}

export default index