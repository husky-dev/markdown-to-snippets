# TypeScript - React

## Basic

**Prefix**: `tsrfcb`

**Description**: Functional component with return

**Scope**: `typescript`

```
const $1: FC<Props> = ({ style }) => {
  return (
    <View style={[ styles.container, style ]}>
      $0
    </View>
  );
};
```

**Prefix**: `tsrfcbt`

**Description**: Func component template with return

```
import { View } from 'components/Common';
import React, { FC } from 'react';
import { Styles, ViewStyleProps } from 'styles';

interface Props extends ViewStyleProps {
  $2
}

export const $1: FC<Props> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      $0
    </View>
  );
};

const styles: Styles = {
  container: {},
};

export type $1Props = Props;
export default $1;
```

**Prefix**: `tsrfcs`

**Description**: Simple func component

```
const $1: FC<Props> = ({ style }) => (
  <View style={[styles.container, style]}>
    $0
  </View>
);
```

**Prefix**: `tsrfcst`

**Description**: Simple func component template

```
import { View } from 'components/Common';
import React, { FC } from 'react';
import { Styles, ViewStyleProps } from 'styles';

interface Props extends ViewStyleProps {
  $2
}

export const $1: FC<Props> = ({ style }) => (
  <View style={[styles.container, style]}>
    $0
  </View>
);

const styles: Styles = {
  container: {},
};

export type $1Props = Props;
export default $1;
```
