import {EnvironmentProviders, importProvidersFrom, InjectionToken, Type} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  FeatureSlice,
  RootStoreConfig,
  StoreConfig,
  StoreModule,
} from '@ngrx/store';
import {StoreDevtoolsConfig, StoreDevtoolsModule} from '@ngrx/store-devtools';

// @ngrx/store
export function provideStore<T, K extends Action = Action>(
  reducers?: ActionReducerMap<T, K> | InjectionToken<ActionReducerMap<T, K>>,
  config?: RootStoreConfig<T, K>
): EnvironmentProviders {
  return importProvidersFrom(
    StoreModule.forRoot(reducers ?? ({} as ActionReducerMap<T, K>), config)
  );
}

export function provideStoreFeature<T, K extends Action = Action>(
  featureName: string,
  reducers: ActionReducerMap<T, K> | InjectionToken<ActionReducerMap<T, K>>,
  config?: StoreConfig<T, K> | InjectionToken<StoreConfig<T, K>>
): EnvironmentProviders;
export function provideStoreFeature<T, K extends Action = Action>(
  featureName: string,
  reducer: ActionReducer<T, K> | InjectionToken<ActionReducer<T, K>>,
  config?: StoreConfig<T, K> | InjectionToken<StoreConfig<T, K>>
): EnvironmentProviders;
export function provideStoreFeature<T, K extends Action = Action>(
  feature: FeatureSlice<T, K>
): EnvironmentProviders;
export function provideStoreFeature<T, K extends Action = Action>(
  nameOrFeature: string | FeatureSlice<T, K>,
  reducers?:
    | ActionReducerMap<T, K>
    | ActionReducer<T, K>
    | InjectionToken<ActionReducer<T, K>>
    | InjectionToken<ActionReducerMap<T, K>>,
  config?: StoreConfig<T, K> | InjectionToken<StoreConfig<T, K>>
): EnvironmentProviders {
  return importProvidersFrom(
    StoreModule.forFeature(nameOrFeature as any, reducers as any, config)
  );
}

// @ngrx/effects
export function provideEffects(
  rootEffects?: Type<unknown>[]
): EnvironmentProviders {
  return importProvidersFrom(EffectsModule.forRoot(rootEffects || []));
}

export function provideFeatureEffects(
  featureEffects: Type<unknown>[]
): EnvironmentProviders {
  return importProvidersFrom(EffectsModule.forFeature(featureEffects));
}

// @ngrx/store-devtools
export function provideStoreDevtools(
  config?: StoreDevtoolsConfig
): EnvironmentProviders {
  return importProvidersFrom(StoreDevtoolsModule.instrument(config));
}
