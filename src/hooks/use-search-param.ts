import { parseAsString, useQueryState } from 'nuqs';

export function useSearchParam() {
  return useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      // Remove the parameter from the URL when the value equals the default
      clearOnDefault: true,
    }),
  );
}
