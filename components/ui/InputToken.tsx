import { MAX_NUMBER_INPUT_DECIMAL, MAX_NUMBER_INPUT_VALUE } from '@/constants';
import { useBalance } from '@/hook/useBalance';
import { useUtility } from '@/hook/useUtility';
import { IBaseTokenModel } from '@/types/token.model';
import { formatReadableNumber } from '@/utils/format';
import { InputNumber } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import TokenSelector from './TokenSelector';

interface Props {
  isHalf?: boolean;
  disabled?: boolean;
  token?: IBaseTokenModel;
  onChange: (token: IBaseTokenModel) => void;
}

const InputToken = ({ isHalf, disabled, token, onChange }: Props) => {
  const t = useTranslations();
  const { isNativeToken } = useUtility();
  const { balance: tokenBalance } = useBalance(
    !isNativeToken(token?.id) ? token?.address : undefined,
  );

  const balance = useMemo(() => {
    if (!token) {
      return 0;
    }
    return tokenBalance;
  }, [token, tokenBalance]);

  const handleOnChange = useCallback(
    (value: string) => {
      if (!token || disabled) {
        return;
      }
      onChange({ ...token, amount: value });
    },
    [balance, token, disabled],
  );

  const handleHalf = useCallback(() => {
    if (!token || disabled) {
      return;
    }
    onChange({ ...token, amount: String(Number(balance / 2)) });
  }, [balance, token, disabled]);

  const handleBalance = useCallback(() => {
    if (!token || disabled) {
      return;
    }
    onChange({ ...token, amount: String(balance) });
  }, [balance, token, disabled]);

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <InputNumber
          isAllowed={(values) => {
            const { floatValue } = values;
            return !floatValue || floatValue < MAX_NUMBER_INPUT_VALUE;
          }}
          maxDecimal={MAX_NUMBER_INPUT_DECIMAL}
          disabled={disabled}
          isFull
          autoComplete="off"
          aria-autocomplete="none"
          value={token?.amount ? String(token?.amount) : ''}
          className="p-0 flex-1"
          classNameInput={twMerge(
            'placeholder:font-semibold text-xl placeholder:text-xl font-semibold',
            disabled && 'cursor-not-allowed',
          )}
          onChangeValue={handleOnChange}
          placeholder={isHalf ? '0.0' : '0'}
        />
      </div>
      <div className="flex flex-col items-end justify-start gap-2">
        <TokenSelector value={token} onChange={onChange} />
        <div className="flex items-center gap-1">
          <span className="text-txt-secondary">{t('common_balance')}:</span>
          <div className="flex items-center text-txt-secondary gap-1">
            <button className="text-brand-primary" onClick={handleBalance}>
              {formatReadableNumber(balance, {
                isTokenAmount: true,
              })}
            </button>
            {isHalf && (
              <>
                <span className="vertical-divider" />
                <button className="text-brand-primary" onClick={handleHalf}>
                  {t('common_half')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputToken;
