import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

// Home screen component
const Home = ({navigation, route}) => {
  const userInfo = route.params.userInfo; // Get user info from navigation params
  const colorScheme = useColorScheme(); // Get color scheme for dynamic styling
  const [chartWidth, setChartWidth] = useState(
    Dimensions.get('window').width - 24,
  );

  useEffect(() => {
    const updateWidth = () => {
      setChartWidth(Dimensions.get('window').width - 16);
    };

    Dimensions.addEventListener('change', updateWidth);

    return () => {
      Dimensions.removeEventListener('change', updateWidth);
    };
  }, []);

  // Data for carousel items
  const views1 = [
    {imgUrl: 'https://picsum.photos/200/300?random=1', title: 'Airport Cabs'},
    {imgUrl: 'https://picsum.photos/200/300?random=3', title: 'Gift Cards'},
    {imgUrl: 'https://picsum.photos/200/300?random=5', title: 'Hourly Stays'},
    {
      imgUrl: 'https://picsum.photos/200/300?random=7',
      title: 'Travel Insurance',
    },
    {imgUrl: 'https://picsum.photos/200/300?random=9', title: 'Forex'},
    {
      imgUrl: 'https://picsum.photos/200/300?random=11',
      title: 'HomeStays & Villas',
    },
  ];

  // Render carousel items
  const renderItem1 = ({item}) => {
    return (
      <View style={styles.renderItem1_parentView}>
        <Image source={{uri: item.imgUrl}} style={styles.renderItem1_img} />
        <View style={styles.renderItem1_view1}>
          <Text style={[styles.renderItem1_text1, {color: getTextColor()}]}>
            OFFERS
          </Text>
        </View>
        <View style={styles.renderItem1_view2}>
          <Text style={[styles.renderItem1_text2, {color: getTextColor()}]}>
            {item.title}
          </Text>
          <TouchableOpacity>
            <Text style={styles.renderItem1_text3}>EXPLORE OFFERS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Function to get text color based on color scheme
  const getTextColor = () => {
    return colorScheme === 'dark' ? 'black' : 'black';
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, {color: getTextColor()}]}>
          Hello, {userInfo.user.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', {userInfo})}>
          <Image
            source={{uri: userInfo.user.photo}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          layout={'stack'}
          data={views1}
          renderItem={renderItem1}
          sliderWidth={400}
          itemWidth={350}
          loop={true}
          autoplay={true}
          autoplayInterval={2000}
          loopClonesPerSide={views1.length}
          contentContainerCustomStyle={{paddingBottom: 20}}
        />
      </View>
      <ScrollView>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            <Text style={[styles.chartTitle, {color: getTextColor()}]}>
              Line Chart
            </Text>
            <LineChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43],
                  },
                ],
              }}
              width={chartWidth}
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          {/* Add other chart components here */}
          {/* Bar Chart */}
          <View style={styles.chart}>
            <Text style={[styles.chartTitle, {color: getTextColor()}]}>
              Bar Chart
            </Text>
            <BarChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43],
                  },
                ],
              }}
              width={chartWidth}
              height={220}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          {/* Pie Chart */}
          <View style={styles.chart}>
            <Text style={[styles.chartTitle, {color: getTextColor()}]}>
              Pie Chart
            </Text>
            <PieChart
              data={[
                {
                  name: 'Seoul',
                  population: 21500000,
                  color: '#F00',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Toronto',
                  population: 2800000,
                  color: '#FF0',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Beijing',
                  population: 527612,
                  color: '#0F0',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'New York',
                  population: 8538000,
                  color: '#00F',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Moscow',
                  population: 11920000,
                  color: '#000',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={chartWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
          {/* Progress Chart */}
          <View style={styles.chart}>
            <Text style={[styles.chartTitle, {color: getTextColor()}]}>
              Progress Chart
            </Text>
            <ProgressChart
              data={{
                labels: ['Swim', 'Bike', 'Run'], // optional
                data: [0.4, 0.6, 0.8],
              }}
              width={chartWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              hideLegend={false}
            />
          </View>
          {/* Contribution Graph */}
          <View style={styles.chart}>
            <Text style={[styles.chartTitle, {color: getTextColor()}]}>
              Contribution Graph
            </Text>
            <ContributionGraph
              values={[
                {date: '2019-01-02', count: 1},
                {date: '2019-01-03', count: 2},
                {date: '2019-01-04', count: 3},
                {date: '2019-01-05', count: 4},
                {date: '2019-01-06', count: 5},
                {date: '2019-01-30', count: 2},
                {date: '2019-01-31', count: 3},
                {date: '2019-03-01', count: 2},
                {date: '2019-04-02', count: 4},
                {date: '2019-03-05', count: 2},
                {date: '2019-02-30', count: 4},
              ]}
              endDate={new Date('2019-04-01')}
              numDays={105}
              width={300}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          {/* Stacked Bar Chart */}
          <View style={styles.chart}>
            <Text style={[styles.chartTitle, {color: getTextColor()}]}>
              Stacked Bar Chart
            </Text>
            <StackedBarChart
              data={{
                labels: ['Test1', 'Test2'],
                legend: ['L1', 'L2', 'L3'],
                data: [
                  [60, 60, 60],
                  [30, 30, 60],
                ],
                barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
              }}
              width={chartWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  carouselContainer: {
    alignItems: 'center',
    padding: 20,
  },
  renderItem1_parentView: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    height: 250,
    width: 350,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  renderItem1_view1: {
    width: 80,
    position: 'absolute',
    fontSize: 20,
    top: 10,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    alignItems: 'center',
  },
  renderItem1_view2: {
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  renderItem1_img: {
    width: 350,
    height: 200,
  },
  renderItem1_text1: {
    fontWeight: '700',
    color: '#000000',
  },
  renderItem1_text2: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  renderItem1_text3: {
    marginVertical: 12,
    color: 'blue',
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  chart: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
