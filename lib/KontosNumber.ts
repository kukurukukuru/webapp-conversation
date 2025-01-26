import { DEFAULT_DISPLAY_PRECESION } from "@/config";
import BigNumber from "bignumber.js";

export function trimTrailingZeros(input: string): string {
  // Split the input string into two parts: before and after the decimal point
  const parts = input.split(".");

  // If there is no decimal point or the decimal part is empty, return the original string directly
  if (parts.length !== 2 || parts[1] === "") {
    return input;
  }

  // Remove the 0 at the end of the decimal part
  const decimalPartTrimmed = parts[1].replace(/0+$/, "");

  // If the processed decimal part is empty, only the integer part is returned
  if (decimalPartTrimmed === "") {
    return parts[0];
  }

  // Return the processed string
  return `${parts[0]}.${decimalPartTrimmed}`;
}

class KontosNumber {
  private value: BigNumber;

  constructor(value?: number | string | BigNumber, decimal?: number) {
    const factor = new BigNumber(10).pow(decimal || 0);
    this.value = new BigNumber(value || 0).div(factor);
  }

  private _toKontosNumber(
    other: number | string | KontosNumber,
    decimal?: number
  ): KontosNumber {
    if (other instanceof KontosNumber) {
      return other;
    } else {
      return new KontosNumber(other, decimal);
    }
  }

  // add
  add(other: number | string | KontosNumber, decimal?: number): KontosNumber {
    return new KontosNumber(
      this.value.plus(this._toKontosNumber(other, decimal).value)
    );
  }

  // minus
  minus(other: number | string | KontosNumber, decimal?: number): KontosNumber {
    return new KontosNumber(
      this.value.minus(this._toKontosNumber(other, decimal).value)
    );
  }

  // multiply
  multiply(
    other: number | string | KontosNumber,
    decimal?: number
  ): KontosNumber {
    return new KontosNumber(
      this.value.times(this._toKontosNumber(other, decimal).value)
    );
  }

  // divide
  divide(
    other: number | string | KontosNumber,
    decimal?: number
  ): KontosNumber {
    const otherKontosNumber = this._toKontosNumber(other, decimal);
    if (otherKontosNumber.value.isZero()) {
      throw new Error("Cannot divide by zero");
    }
    return new KontosNumber(this.value.div(otherKontosNumber.value));
  }

  // greater than
  gt(other: number | string | KontosNumber, decimal?: number): boolean {
    return this.value.isGreaterThan(this._toKontosNumber(other, decimal).value);
  }

  // less than
  lt(other: number | string | KontosNumber, decimal?: number): boolean {
    return this.value.isLessThan(this._toKontosNumber(other, decimal).value);
  }

  abs(): KontosNumber {
    return new KontosNumber(this.value.abs());
  }

  // equal to
  eq(other: number | string | KontosNumber, decimal?: number): boolean {
    return this.value.isEqualTo(this._toKontosNumber(other, decimal).value);
  }

  // greater than or equal to
  gte(other: number | string | KontosNumber, decimal?: number): boolean {
    return this.value.isGreaterThanOrEqualTo(
      this._toKontosNumber(other, decimal).value
    );
  }

  // less than or equal to
  lte(other: number | string | KontosNumber, decimal?: number): boolean {
    return this.value.isLessThanOrEqualTo(
      this._toKontosNumber(other, decimal).value
    );
  }

  toString(): string {
    return this.value.toFixed();
  }

  // This is for api params
  toStringWithDecimal(decimal: number): string {
    const factor = new BigNumber(10).pow(decimal);
    const result = this.value.multipliedBy(factor).integerValue();
    return result.toFixed();
  }

  toNumber(): number {
    return this.value.toNumber();
  }

  toNumberWithCheck(): number {
    if (
      this.value.isGreaterThan(Number.MAX_SAFE_INTEGER) ||
      this.value.isLessThan(Number.MIN_SAFE_INTEGER)
    ) {
      console.warn(
        "Warning: Converting a BigNumber to a JavaScript Number results in loss of precision."
      );
    }
    return this.value.toNumber();
  }

  round(precision?: number): KontosNumber {
    if (!precision) {
      return new KontosNumber(this.value);
    }
    return new KontosNumber(
      this.value.decimalPlaces(precision, BigNumber.ROUND_DOWN)
    );
  }

  oldToFormat(precision?: number): string {
    return this.value.toFormat(precision);
  }

  toFormat = (significantDigits?: number): string => {
    return this.toFormatV2({ significantDigits });
  };

  toFormatV2(
    props: {
      significantDigits?: number; // Number of Significant Digits
      leadingZeroLimit?: number; // When the leading zero after the decimal point exceeds this number, use curly braces
      zeroPlaceholder?: string; // Placeholder for Zero
      roundingMode?: BigNumber.RoundingMode; // Default does not round, truncates directly
      trimTrailingZeros?: boolean; // Remove the trailing zeros after the decimal point
    } = {
      significantDigits: DEFAULT_DISPLAY_PRECESION,
      leadingZeroLimit: 2,
      zeroPlaceholder: "0.00",
      roundingMode: BigNumber.ROUND_DOWN,
      trimTrailingZeros: true,
    }
  ): string {
    const significantDigits =
      props.significantDigits || DEFAULT_DISPLAY_PRECESION;
    const leadingZeroLimit = props.leadingZeroLimit || 2;
    const zeroPlaceholder = props.zeroPlaceholder || "0.00";
    const roundingMode = props.roundingMode || BigNumber.ROUND_DOWN;
    const trimTrailingZeros = props.trimTrailingZeros || true;

    if (this.value.eq(0)) {
      return zeroPlaceholder;
    }

    const isNegative = this.value.isNegative(); // Check if the number is negative
    const absNumber = this.value.absoluteValue();
    let formattedNumber = "";

    if (absNumber.isLessThan(0.1) && absNumber.isGreaterThan(0)) {
      const decimalExpansion = absNumber.toFixed(
        absNumber.decimalPlaces() || 0 + leadingZeroLimit + significantDigits
      );
      const decimalPart = decimalExpansion.split(".")[1] || "";
      const leadingZeros = decimalPart.match(/^0*/)?.[0].length || 0;

      if (leadingZeros > leadingZeroLimit) {
        // The number of leading zeros exceeds the limit, indicated by curly braces
        const neededDigits = leadingZeros + significantDigits; // The total number of characters required, including leading zeros
        const roundedNumber = absNumber.toFixed(neededDigits, roundingMode);
        const significantPart = roundedNumber.substring(2 + leadingZeros); // Skip leading zeros directly after the decimal point and start taking SignificantDigits digits
        formattedNumber = `0.{${leadingZeros}}${significantPart}`;
      } else {
        // The number of leading zeros does not exceed the limit, displaying decimals normally
        formattedNumber = absNumber.toFormat(significantDigits - 1); // Display all valid digits, including decimal places
      }
    } else {
      // Numbers greater than or equal to 0.1, or less than or equal to 0, directly formatted for display
      const integerDigits = absNumber.integerValue().toString().length;
      const decimalPrecision = Math.max(0, significantDigits - integerDigits);
      formattedNumber = absNumber.toFixed(decimalPrecision, roundingMode);
    }

    if (trimTrailingZeros) {
      // If it is decided to remove the trailing zeros after the decimal point
      formattedNumber = formattedNumber.replace(/\.?0+$/, "");
    }

    return (isNegative ? "-" : "") + formattedNumber;
  }

  toFormatWithSymbol(precision?: number) {
    const units = [
      { value: new BigNumber(1e12), symbol: "T" },
      { value: new BigNumber(1e9), symbol: "B" },
      { value: new BigNumber(1e6), symbol: "M" },
      { value: new BigNumber(1e3), symbol: "K" },
    ];

    for (let i = 0; i < units.length; i++) {
      if (this.value.isGreaterThanOrEqualTo(units[i].value)) {
        return (
          this.value.dividedBy(units[i].value).toFormat(precision) +
          units[i].symbol
        );
      }
    }

    return this.value.toFormat(precision);
  }

  toFixed(
    precision?: number,
    trimZeros: boolean = false,
    maxDigits?: number
  ): string {
    let result;

    if (precision !== undefined) {
      result = this.value.toFixed(precision);

      if (trimZeros) {
        result = result.replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
      }
    } else {
      result = this.toString();
    }

    if (maxDigits !== undefined) {
      const [integerPart, decimalPart] = result.split(".");
      if (integerPart.length > maxDigits) {
        result = integerPart.substring(0, maxDigits);
      } else if (
        integerPart.length + (decimalPart ? decimalPart.length : 0) >
        maxDigits
      ) {
        const remainingDigits = maxDigits - integerPart.length;
        result = decimalPart
          ? `${integerPart}.${decimalPart.substring(0, remainingDigits)}`
          : integerPart;
      }

      result = result.replace(/\.$/, "");
    }

    return result;
  }

  integerValue(): KontosNumber {
    return new KontosNumber(this.value.integerValue());
  }
}

export default KontosNumber;
