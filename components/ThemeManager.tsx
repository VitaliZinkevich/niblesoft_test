import React from 'react'
import { Appearance } from 'react-native-appearance'
import { ThemeColors as ReactNavigationThemeColors } from 'react-navigation'
// set default colour scheme from OS
const osTheme = Appearance.getColorScheme();

export const ThemeColors = {
   primaryText: {
      light: 'black',
      dark: 'white',
   },
   primaryBackground: {
      light: 'white',
      dark: 'black',
   },
};

export const getTheme = (mode: string) => {
   let theme = {};
   for (let key in ThemeColors) {
      theme[key] = ThemeColors[key][mode];
   }
   return theme;
}; 


// initiate context
export const ManageThemeContext: React.Context<any> = React.createContext({
  mode: osTheme,
  theme: getTheme(osTheme),
  toggle: () => { }
});

// define useTheme hook for functional components
export const useTheme = () => React.useContext(ManageThemeContext);

// initiate context provider
export class ThemeManager extends React.Component<any, any> {

  state = {
    mode: osTheme
  };

  componentDidUpdate () {
    console.log('theme updated');
  }

  toggleTheme = async () => {
    this.state.mode === 'light'
      ? this.setState({
        mode: 'dark'
      })
      : this.setState({
        mode: 'light'
      })
  }

  render () {
    return (
      <ManageThemeContext.Provider value={{
        mode: this.state.mode,
        theme: getTheme(osTheme),
        toggle: this.toggleTheme
      }}>
        {this.props.children}
      </ManageThemeContext.Provider>
    )
  }
}

export default ThemeManager;