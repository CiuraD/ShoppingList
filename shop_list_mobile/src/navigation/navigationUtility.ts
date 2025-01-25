import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const useNavigateTo = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const navigateTo = (routeName: keyof RootStackParamList) => {
        navigation.navigate(routeName as any);
    };

    const navigateToParams = (routeName: keyof RootStackParamList, params?: any) => {
        navigation.navigate(routeName as any, params);
    };

    return [navigateTo, navigateToParams] as const;
};
