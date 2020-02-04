import { TextStyle, LayerTextData, ParagraphStyle, Font, AntiAlias, TextGridInfo, Justification, Color } from './psd';

interface Adjustments {
  Axis: number[];
  XY: number[];
}

interface TypeValues {
  Type: number;
  Values: number[];
}

interface ParagraphProperties {
  Justification?: number;
  FirstLineIndent?: number;
  StartIndent?: number;
  EndIndent?: number;
  SpaceBefore?: number;
  SpaceAfter?: number;
  AutoHyphenate?: boolean;
  HyphenatedWordSize?: number;
  PreHyphen?: number;
  PostHyphen?: number;
  ConsecutiveHyphens?: number;
  Zone?: number;
  WordSpacing?: number[];
  LetterSpacing?: number[];
  GlyphSpacing?: number[];
  AutoLeading?: number;
  LeadingType?: number;
  Hanging?: boolean;
  Burasagari?: boolean;
  KinsokuOrder?: number;
  EveryLineComposer?: boolean;
}

interface ParagraphSheet {
  Name?: string;
  DefaultStyleSheet: number;
  Properties: ParagraphProperties;
}

interface StyleSheetData {
  Font?: number;
  FontSize?: number;
  FauxBold?: boolean;
  FauxItalic?: boolean;
  AutoLeading?: boolean;
  Leading?: number;
  HorizontalScale?: number;
  VerticalScale?: number;
  Tracking?: number;
  AutoKerning?: boolean;
  Kerning?: number;
  BaselineShift?: number;
  FontCaps?: number;
  FontBaseline?: number;
  Underline?: boolean;
  Strikethrough?: boolean;
  Ligatures?: boolean;
  DLigatures?: boolean;
  BaselineDirection?: number;
  Tsume?: number;
  StyleRunAlignment?: number;
  Language?: number;
  NoBreak?: boolean;
  FillColor?: TypeValues;
  StrokeColor?: TypeValues;
  FillFlag?: boolean;
  StrokeFlag?: boolean;
  FillFirst?: boolean;
  YUnderline?: number;
  OutlineWidth?: number;
  CharacterDirection?: number;
  HindiNumbers?: boolean;
  Kashida?: number;
  DiacriticPos?: number;
};

interface FontSet {
  Name: string;
  Script: number;
  FontType: number;
  Synthetic: number;
}

interface ResourceDict {
  KinsokuSet: any[];
  MojiKumiSet: any[];
  TheNormalStyleSheet: number;
  TheNormalParagraphSheet: number;
  ParagraphSheetSet: ParagraphSheet[];
  StyleSheetSet: { Name: string; StyleSheetData: StyleSheetData; }[];
  FontSet: FontSet[];
  SuperscriptSize: number;
  SuperscriptPosition: number;
  SubscriptSize: number;
  SubscriptPosition: number;
  SmallCapSize: number;
}

interface ParagraphRun {
  ParagraphSheet: ParagraphSheet;
  Adjustments: Adjustments;
}

interface StyleRun {
  StyleSheet: { StyleSheetData: StyleSheetData; };
}

interface EngineData {
  EngineDict: {
    Editor: { Text: string; };
    ParagraphRun: {
      DefaultRunData: ParagraphRun;
      RunArray: ParagraphRun[];
      RunLengthArray: number[];
      IsJoinable: number;
    };
    StyleRun: {
      DefaultRunData: StyleRun;
      RunArray: StyleRun[];
      RunLengthArray: number[];
      IsJoinable: number;
    };
    GridInfo: {
      GridIsOn: boolean;
      ShowGrid: boolean;
      GridSize: number;
      GridLeading: number;
      GridColor: TypeValues;
      GridLeadingFillColor: TypeValues;
      AlignLineHeightToGridFlags: boolean;
    };
    AntiAlias: number;
    UseFractionalGlyphWidths: boolean;
    Rendered: {};
  };
  ResourceDict: ResourceDict;
  DocumentResources: ResourceDict;
}

const defaultFont: Font = {
  name: 'MyriadPro-Regular',
  script: 0,
  type: 0,
  synthetic: 0,
};

const defaultParagraphStyle: ParagraphStyle = {
  justification: 'left',
  firstLineIndent: 0,
  startIndent: 0,
  endIndent: 0,
  spaceBefore: 0,
  spaceAfter: 0,
  autoHyphenate: true,
  hyphenatedWordSize: 6,
  preHyphen: 2,
  postHyphen: 2,
  consecutiveHyphens: 8,
  zone: 36,
  wordSpacing: [0.8, 1, 1.33],
  letterSpacing: [0, 0, 0],
  glyphSpacing: [1, 1, 1],
  autoLeading: 1.2,
  leadingType: 0,
  hanging: false,
  burasagari: false,
  kinsokuOrder: 0,
  everyLineComposer: false,
};

const defaultStyle: TextStyle = {
  font: defaultFont,
  fontSize: 12,
  fauxBold: false,
  fauxItalic: false,
  autoLeading: true,
  leading: 0,
  horizontalScale: 1,
  verticalScale: 1,
  tracking: 0,
  autoKerning: true,
  kerning: 0,
  baselineShift: 0,
  fontCaps: 0,
  fontBaseline: 0,
  underline: false,
  strikethrough: false,
  ligatures: true,
  dLigatures: false,
  baselineDirection: 2,
  tsume: 0,
  styleRunAlignment: 2,
  language: 0,
  noBreak: false,
  fillColor: { r: 0, g: 0, b: 0 },
  strokeColor: { r: 0, g: 0, b: 0 },
  fillFlag: true,
  strokeFlag: false,
  fillFirst: true,
  yUnderline: 1,
  outlineWidth: 1,
  characterDirection: 0,
  hindiNumbers: false,
  kashida: 1,
  diacriticPos: 2,
};

const defaultGridInfo: TextGridInfo = {
  isOn: false,
  show: false,
  size: 18,
  leading: 22,
  color: { r: 0, g: 0, b: 255 },
  leadingFillColor: { r: 0, g: 0, b: 255 },
  alignLineHeightToGridFlags: false,
};

const paragraphStyleKeys: (keyof ParagraphStyle)[] = [
  'justification', 'firstLineIndent', 'startIndent', 'endIndent', 'spaceBefore', 'spaceAfter',
  'autoHyphenate', 'hyphenatedWordSize', 'preHyphen', 'postHyphen', 'consecutiveHyphens',
  'zone', 'wordSpacing', 'letterSpacing', 'glyphSpacing', 'autoLeading', 'leadingType',
  'hanging', 'burasagari', 'kinsokuOrder', 'everyLineComposer',
];

const styleKeys: (keyof TextStyle)[] = [
  'font', 'fontSize', 'fauxBold', 'fauxItalic', 'autoLeading', 'leading', 'horizontalScale',
  'verticalScale', 'tracking', 'autoKerning', 'kerning', 'baselineShift', 'fontCaps', 'fontBaseline',
  'underline', 'strikethrough', 'ligatures', 'dLigatures', 'baselineDirection', 'tsume',
  'styleRunAlignment', 'language', 'noBreak', 'fillColor', 'strokeColor', 'fillFlag',
  'strokeFlag', 'fillFirst', 'yUnderline', 'outlineWidth', 'characterDirection', 'hindiNumbers',
  'kashida', 'diacriticPos',
];

const antialias: AntiAlias[] = ['none', 'crisp', 'strong', 'smooth', 'sharp'];
const justification: Justification[] = ['left', 'right', 'center'];

function upperFirst(value: string) {
  return value.substr(0, 1).toUpperCase() + value.substr(1);
}

function decodeColor(color: { Type: number; Values: number[]; }): Color {
  const c = color.Values;

  if (color.Type === 0) { // grayscale
    return { r: c[1] * 255, g: c[1] * 255, b: c[1] * 255 }; // , c[0] * 255];
  } else { // rgb
    return { r: c[1] * 255, g: c[2] * 255, b: c[3] * 255 }; // , c[0] * 255];
  }
}

function encodeColor(color: Color | undefined) {
  if (color && 'r' in color) {
    return [255 * 255, color.r / 255, color.g / 255, color.b / 255];
  } else {
    return [255 * 255, 0, 0, 0];
  }
}

function arraysEqual(a: any[], b: any[]) {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

function objectsEqual(a: any, b: any) {
  if (!a || !b) return false;
  for (const key of Object.keys(a)) if (a[key] !== b[key]) return false;
  for (const key of Object.keys(b)) if (a[key] !== b[key]) return false;
  return true;
}

function findOrAddFont(fonts: Font[], font: Font) {
  for (let i = 0; i < fonts.length; i++) {
    if (fonts[i].name === font.name) return i;
  }

  fonts.push(font);
  return fonts.length - 1;
}

function decodeObject(obj: any, keys: string[], fonts: Font[]) {
  const result: any = {};

  for (const key of keys) {
    const Key = upperFirst(key);

    if (obj[Key] === undefined) continue;

    if (key === 'justification') {
      result[key] = justification[obj[Key]];
    } else if (key === 'font') {
      result[key] = fonts[obj[Key]];
    } else if (key === 'fillColor' || key === 'strokeColor') {
      result[key] = decodeColor(obj[Key]);
    } else {
      result[key] = obj[Key];
    }
  }

  return result;
}

function encodeObject(obj: any, keys: string[], fonts: Font[]) {
  const result: any = {};

  for (const key of keys) {
    const Key = upperFirst(key);

    if (obj[key] === undefined) continue;

    if (key === 'justification') {
      result[Key] = justification.indexOf(obj[key] ?? 'left');
    } else if (key === 'font') {
      result[Key] = findOrAddFont(fonts, obj[key]);
    } else if (key === 'fillColor' || key === 'strokeColor') {
      result[Key] = { Type: 1, Values: encodeColor(obj[key]) } as TypeValues;
    } else {
      result[Key] = obj[key];
    }
  }

  return result;
}

function decodeParagraphStyle(obj: ParagraphProperties, fonts: Font[]): ParagraphStyle {
  return decodeObject(obj, paragraphStyleKeys, fonts);
}

function decodeStyle(obj: StyleSheetData, fonts: Font[]): TextStyle {
  return decodeObject(obj, styleKeys, fonts);
}

function encodeParagraphStyle(obj: ParagraphStyle, fonts: Font[]): ParagraphProperties {
  return encodeObject(obj, paragraphStyleKeys, fonts);
}

function encodeStyle(obj: TextStyle, fonts: Font[]): StyleSheetData {
  return encodeObject(obj, styleKeys, fonts);
}

function deduplicateValues<T>(base: T, runs: { style: T; }[], keys: (keyof T)[]) {
  if (!runs.length) return;

  for (const key of keys) {
    const value = runs[0].style[key];

    if (value !== undefined) {
      let identical = false;

      if (Array.isArray(value)) {
        identical = runs.every(r => arraysEqual(r.style[key] as any, value));
      } else if (typeof value === 'object') {
        identical = runs.every(r => objectsEqual(r.style[key] as any, value));
      } else {
        identical = runs.every(r => r.style[key] === value);
      }

      if (identical) {
        base[key] = value as any;
      }
    }

    const styleValue = base[key];

    if (styleValue !== undefined) {
      for (const r of runs) {
        let same = false;

        if (Array.isArray(value)) {
          same = arraysEqual(r.style[key] as any, value);
        } else if (typeof value === 'object') {
          same = objectsEqual(r.style[key] as any, value);
        } else {
          same = r.style[key] === value;
        }

        if (same) delete r.style[key];
      }
    }
  }

  if (runs.every(x => Object.keys(x.style).length === 0)) {
    runs.length = 0;
  }
}

export function decodeEngineData(engineData: EngineData) {
  const engineDict = engineData.EngineDict;
  const resourceDict = engineData.ResourceDict;

  const fonts = resourceDict.FontSet.map<Font>(f => ({
    name: f.Name,
    script: f.Script,
    type: f.FontType,
    synthetic: f.Synthetic,
  }));

  const result: LayerTextData = {
    text: engineDict.Editor.Text.replace(/\r/g, '\n').replace(/\n$/, ''),
    antiAlias: antialias[engineDict.AntiAlias] ?? 'smooth',
    useFractionalGlyphWidths: !!engineDict.UseFractionalGlyphWidths,
    superscriptSize: resourceDict.SuperscriptSize,
    superscriptPosition: resourceDict.SuperscriptPosition,
    subscriptSize: resourceDict.SubscriptSize,
    subscriptPosition: resourceDict.SubscriptPosition,
    smallCapSize: resourceDict.SmallCapSize,
  };

  // paragraph style

  // const theNormalParagraphSheet = resourceDict.TheNormalParagraphSheet;
  // const paragraphSheetSet = resourceDict.ParagraphSheetSet;
  // const paragraphProperties = paragraphSheetSet[theNormalParagraphSheet].Properties;
  const paragraphRun = engineData.EngineDict.ParagraphRun;

  result.paragraphStyle = {}; // decodeParagraphStyle(paragraphProperties, fonts);
  result.paragraphStyleRuns = [];

  for (let i = 0; i < paragraphRun.RunArray.length; i++) {
    const run = paragraphRun.RunArray[i];
    const length = paragraphRun.RunLengthArray[i];
    const style = decodeParagraphStyle(run.ParagraphSheet.Properties, fonts);
    // const adjustments = {
    //   axis: run.Adjustments.Axis,
    //   xy: run.Adjustments.XY,
    // };
    result.paragraphStyleRuns.push({ length, style/*, adjustments*/ });
  }

  deduplicateValues(result.paragraphStyle, result.paragraphStyleRuns, paragraphStyleKeys);

  if (!result.paragraphStyleRuns.length) delete result.paragraphStyleRuns;

  // style

  // const theNormalStyleSheet = resourceDict.TheNormalStyleSheet;
  // const styleSheetSet = resourceDict.StyleSheetSet;
  // const styleSheetData = styleSheetSet[theNormalStyleSheet].StyleSheetData;
  const styleRun = engineData.EngineDict.StyleRun;

  result.style = {}; // decodeStyle(styleSheetData, fonts);
  result.styleRuns = [];

  for (let i = 0; i < styleRun.RunArray.length; i++) {
    const length = styleRun.RunLengthArray[i];
    const style = decodeStyle(styleRun.RunArray[i].StyleSheet.StyleSheetData, fonts);
    result.styleRuns.push({ length, style });
  }

  deduplicateValues(result.style, result.styleRuns, styleKeys);

  if (!result.styleRuns.length) delete result.styleRuns;

  return result;
}

export function encodeEngineData(data: LayerTextData) {
  const text = `${(data.text ?? '').replace(/\r?\n/g, '\r')}\r`;

  const fonts: Font[] = [
    { name: 'AdobeInvisFont', script: 0, type: 0, synthetic: 0 },
  ];

  const defFont = data.style?.font ||
    data.styleRuns?.find(s => s.style.font)?.style.font ||
    defaultFont;

  const paragraphProperties = encodeParagraphStyle({ ...defaultParagraphStyle, ...data.paragraphStyle }, fonts);
  const paragraphRunArray: ParagraphRun[] = [];
  const paragraphRunLengthArray: number[] = [];

  if (data.paragraphStyleRuns?.length) {
    for (const run of data.paragraphStyleRuns) {
      paragraphRunLengthArray.push(run.length);
      paragraphRunArray.push({
        ParagraphSheet: {
          DefaultStyleSheet: 0,
          Properties: encodeParagraphStyle({
            ...defaultParagraphStyle, ...data.paragraphStyle, ...run.style
          }, fonts),
        },
        Adjustments: { Axis: [1, 0, 1], XY: [0, 0] },
      });
    }
  } else {
    for (let i = 0, last = 0; i < text.length; i++) {
      if (text.charCodeAt(i) === 13) { // \r
        paragraphRunLengthArray.push(i - last + 1);
        paragraphRunArray.push({
          ParagraphSheet: {
            DefaultStyleSheet: 0,
            Properties: paragraphProperties,
          },
          Adjustments: { Axis: [1, 0, 1], XY: [0, 0] },
        });
        last = i + 1;
      }
    }
  }

  const styleSheetData = encodeStyle({ ...defaultStyle, font: defFont }, fonts);
  const styleRuns = data.styleRuns ?? [{ length: text.length, style: data.style ?? {} }];
  const styleRunArray: StyleRun[] = [];
  const styleRunLengthArray: number[] = [];

  for (const run of styleRuns) {
    styleRunLengthArray.push(run.length);
    styleRunArray.push({
      StyleSheet: {
        StyleSheetData: encodeStyle({
          kerning: 0,
          autoKerning: true,
          fillColor: { r: 0, g: 0, b: 0 },
          ...data.style,
          ...run.style,
        }, fonts),
      },
    });
  }

  const gridInfo = { ...defaultGridInfo, ...data.gridInfo };
  const writingDirection = data.orientation === 'vertical' ? 2 : 0;
  const procession = data.orientation === 'vertical' ? 1 : 0;

  const defaultResources = {
    KinsokuSet: [
      {
        Name: 'PhotoshopKinsokuHard',
        NoStart: '、。，．・：；？！ー―’”）〕］｝〉》」』】ヽヾゝゞ々ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ゛゜?!)]},.:;℃℉¢％‰',
        NoEnd: '‘“（〔［｛〈《「『【([{￥＄£＠§〒＃',
        Keep: '―‥',
        Hanging: '、。.,',
      },
      {
        Name: 'PhotoshopKinsokuSoft',
        NoStart: '、。，．・：；？！’”）〕］｝〉》」』】ヽヾゝゞ々',
        NoEnd: '‘“（〔［｛〈《「『【',
        Keep: '―‥',
        Hanging: '、。.,',
      },
    ],
    MojiKumiSet: [
      { InternalName: 'Photoshop6MojiKumiSet1' },
      { InternalName: 'Photoshop6MojiKumiSet2' },
      { InternalName: 'Photoshop6MojiKumiSet3' },
      { InternalName: 'Photoshop6MojiKumiSet4' },
    ],
    TheNormalStyleSheet: 0,
    TheNormalParagraphSheet: 0,
    ParagraphSheetSet: [
      {
        Name: 'Normal RGB',
        DefaultStyleSheet: 0,
        Properties: paragraphProperties,
      },
    ],
    StyleSheetSet: [
      {
        Name: 'Normal RGB',
        StyleSheetData: styleSheetData,
      },
    ],
    FontSet: fonts.map<FontSet>(f => ({
      Name: f.name,
      Script: f.script ?? 0,
      FontType: f.type ?? 0,
      Synthetic: f.synthetic ?? 0,
    })),
    SuperscriptSize: data.superscriptSize ?? 0.583,
    SuperscriptPosition: data.superscriptPosition ?? 0.333,
    SubscriptSize: data.subscriptSize ?? 0.583,
    SubscriptPosition: data.subscriptPosition ?? 0.333,
    SmallCapSize: data.smallCapSize ?? 0.7,
  };

  const engineData: EngineData = {
    EngineDict: {
      Editor: { Text: text },
      ParagraphRun: {
        DefaultRunData: {
          ParagraphSheet: { DefaultStyleSheet: 0, Properties: {} },
          Adjustments: { Axis: [1, 0, 1], XY: [0, 0] },
        },
        RunArray: paragraphRunArray,
        RunLengthArray: paragraphRunLengthArray,
        IsJoinable: 1,
      },
      StyleRun: {
        DefaultRunData: { StyleSheet: { StyleSheetData: {} } },
        RunArray: styleRunArray,
        RunLengthArray: styleRunLengthArray,
        IsJoinable: 2,
      },
      GridInfo: {
        GridIsOn: !!gridInfo.isOn,
        ShowGrid: !!gridInfo.show,
        GridSize: gridInfo.size ?? 18,
        GridLeading: gridInfo.leading ?? 22,
        GridColor: { Type: 1, Values: encodeColor(gridInfo.color) },
        GridLeadingFillColor: { Type: 1, Values: encodeColor(gridInfo.color) },
        AlignLineHeightToGridFlags: !!gridInfo.alignLineHeightToGridFlags,
      },
      AntiAlias: antialias.indexOf(data.antiAlias ?? 'sharp'),
      UseFractionalGlyphWidths: data.useFractionalGlyphWidths ?? true,
      Rendered: {
        Version: 1,
        Shapes: {
          WritingDirection: writingDirection,
          Children: [
            {
              ShapeType: 0,
              Procession: procession,
              Lines: { WritingDirection: writingDirection, Children: [] },
              Cookie: {
                Photoshop: {
                  ShapeType: 0,
                  PointBase: [0, 0],
                  Base: {
                    ShapeType: 0,
                    TransformPoint0: [1, 0],
                    TransformPoint1: [0, 1],
                    TransformPoint2: [0, 0],
                  },
                },
              },
            },
          ],
        },
      },
    },
    ResourceDict: { ...defaultResources },
    DocumentResources: { ...defaultResources },
  };

  // console.log('encodeEngineData', require('util').inspect(engineData, false, 99, true));
  return engineData;
}
