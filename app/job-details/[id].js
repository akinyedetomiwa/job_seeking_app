import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { Stack, useRouter, useSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';

import { COLORS, icons, SIZES } from '../../constants';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
} from '../../components';

import useFetch from '../../hook/useFetch';

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id,
  });
const [refreshing, setRefreshing] = useState(false)

const onRefresh = () => {}
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />
      
      <>
      <ScrollView showsHorizontalScrollIndicator ={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} >

        {isLoading? (
            <ActivityIndicator size="large" color={COLORS.primary}/>
        ) : error ? (
            <Text>Something Went Wrong</Text>
        ) : data.length === 0 ? (
            <Text>No data</Text>
        ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100}}>
                <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                Location={data[0]. employer_logo}
                
                />

                <JobTabs/>
            </View>
        )}
      </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;