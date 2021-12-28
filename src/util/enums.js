const STYLE_KEY = {
  POSITION: 0,
  DISPLAY: 1,
  TOP: 2,
  RIGHT: 3,
  BOTTOM: 4,
  LEFT: 5,
  MARGIN_TOP: 6,
  MARGIN_RIGHT: 7,
  MARGIN_BOTTOM: 8,
  MARGIN_LEFT: 9,
  PADDING_TOP: 10,
  PADDING_RIGHT: 11,
  PADDING_BOTTOM: 12,
  PADDING_LEFT: 13,
  FONT_SIZE: 14,
  FONT_FAMILY: 15,
  COLOR: 16,
  FONT_STYLE: 17,
  FONT_WEIGHT: 18,
  LINE_HEIGHT: 19,
  BACKGROUND_IMAGE: 20,
  BACKGROUND_COLOR: 21,
  BACKGROUND_SIZE: 22,
  BACKGROUND_REPEAT: 23,
  BACKGROUND_POSITION_X: 24,
  BACKGROUND_POSITION_Y: 25,
  BORDER_TOP_WIDTH: 26,
  BORDER_RIGHT_WIDTH: 27,
  BORDER_BOTTOM_WIDTH: 28,
  BORDER_LEFT_WIDTH: 29,
  BORDER_TOP_COLOR: 30,
  BORDER_RIGHT_COLOR: 31,
  BORDER_BOTTOM_COLOR: 32,
  BORDER_LEFT_COLOR: 33,
  BORDER_TOP_STYLE: 34,
  BORDER_RIGHT_STYLE: 35,
  BORDER_BOTTOM_STYLE: 36,
  BORDER_LEFT_STYLE: 37,
  BORDER_TOP_LEFT_RADIUS: 38,
  BORDER_TOP_RIGHT_RADIUS: 39,
  BORDER_BOTTOM_RIGHT_RADIUS: 40,
  BORDER_BOTTOM_LEFT_RADIUS: 41,
  WIDTH: 42,
  HEIGHT: 43,
  FLEX_GROW: 44,
  FLEX_SHRINK: 45,
  FLEX_BASIS: 46,
  FLEX_DIRECTION: 47,
  JUSTIFY_CONTENT: 48,
  ALIGN_ITEMS: 49,
  ALIGN_SELF: 50,
  TEXT_ALIGN: 51,
  TRANSFORM_ORIGIN: 52,
  VISIBILITY: 53,
  OPACITY: 54,
  Z_INDEX: 55,
  TRANSFORM: 56,
  TRANSLATE_X: 57,
  TRANSLATE_Y: 58,
  TRANSLATE_Z: 59,
  SCALE_X: 60,
  SCALE_Y: 61,
  SCALE_Z: 62,
  SKEW_X: 63,
  SKEW_Y: 64,
  ROTATE_X: 65,
  ROTATE_Y: 66,
  ROTATE_Z: 67,
  ROTATE_3D: 68,
  PERSPECTIVE: 69,
  PERSPECTIVE_ORIGIN: 70,
  FILTER: 71,
  BOX_SHADOW: 72,
  POINTER_EVENTS: 73,
  OVERFLOW: 74,
  MIX_BLEND_MODE: 75,
  BACKGROUND_CLIP: 76,
  WHITE_SPACE: 77,
  TEXT_OVERFLOW: 78,
  LETTER_SPACING: 79,
  LINE_CLAMP: 80,
  ORDER: 81,
  FLEX_WRAP: 82,
  ALIGN_CONTENT: 83,
  TEXT_STROKE_WIDTH: 84,
  TEXT_STROKE_COLOR: 85,
  TEXT_STROKE_OVER: 86,
  // GEOM
  FILL: 87,
  STROKE: 88,
  STROKE_WIDTH: 89,
  STROKE_DASHARRAY: 90,
  STROKE_DASHARRAY_STR: 91,
  STROKE_LINECAP: 92,
  STROKE_LINEJOIN: 93,
  STROKE_MITERLIMIT: 94,
  FILL_RULE: 95,
  // 无此样式，仅cache或特殊情况需要
  MATRIX: 96,
  BORDER_TOP: 97,
  BORDER_RIGHT: 98,
  BORDER_BOTTOM: 99,
  BORDER_LEFT: 100,
  TRANSLATE_PATH: 101,
};

const STYLE2LOWER_MAP = {};
function style2Lower(s) {
  STYLE2LOWER_MAP[s] = STYLE2LOWER_MAP[s] || s.toLowerCase().replace(/_([a-z])/g, function($0, $1) {
    return $1.toUpperCase();
  });

  return STYLE2LOWER_MAP[s];
}

const STYLE2UPPER_MAP = {};
function style2Upper(s) {
  STYLE2UPPER_MAP[s] = STYLE2UPPER_MAP[s] || s.replace(/([a-z\d_])([A-Z])/g, function($0, $1, $2) {
    return $1 + '_' + $2;
  }).toUpperCase();

  return STYLE2UPPER_MAP[s];
}

const STYLE_R_KEY = {};
const STYLE_RV_KEY = {};
const STYLE_V_KEY = {};
Object.keys(STYLE_KEY).forEach(k => {
  let k2 = STYLE_KEY[k];
  STYLE_R_KEY[k2] = k;
  let l = style2Lower(k);
  STYLE_RV_KEY[k2] = l;
  STYLE_V_KEY[l] = k2;
});

// Root的update过程使用
const UPDATE_KEY = {
  UPDATE_NODE: 0,
  UPDATE_STYLE: 1,
  UPDATE_FOCUS: 2,
  UPDATE_MEASURE: 3,
  UPDATE_COMPONENT: 4,
  UPDATE_OVERWRITE: 5,
  UPDATE_KEYS: 6,
  UPDATE_LIST: 7,
  UPDATE_CONFIG: 8,
  UPDATE_ADD_DOM: 9,
  UPDATE_REMOVE_DOM: 10,
};

// animation计算每帧使用
const KEY_FRAME_KEY = {
  FRAME_STYLE: 0,
  FRAME_TIME: 1,
  FRAME_EASING: 2,
  FRAME_TRANSITION: 3,
};

// 节点使用
const NODE_KEY = {
  NODE_DOM_PARENT: 0,
  NODE_OPACITY: 1,
  NODE_MATRIX: 2,
  NODE_MATRIX_EVENT: 3,
  NODE_CACHE: 4,
  NODE_CACHE_TOTAL: 5,
  NODE_CACHE_FILTER: 6,
  NODE_CACHE_MASK: 7,
  NODE_CACHE_OVERFLOW: 8,
  NODE_STRUCT: 9,
  NODE_TAG_NAME: 10,
  NODE_CURRENT_STYLE: 11,
  NODE_CURRENT_PROPS: 12,
  NODE_COMPUTED_STYLE: 13,
  NODE_CACHE_STYLE: 14,
  NODE_CACHE_PROPS: 15,
  NODE_LIMIT_CACHE: 16,
  NODE_IS_MASK: 17,
  NODE_IS_INLINE: 18,
  NODE_HAS_CONTENT: 19,
  NODE_REFRESH_LV: 20,
  NODE_IS_DESTROYED: 21,
  NODE_STYLE: 22,
  NODE_UPDATE_HASH: 23,
  NODE_UNIQUE_UPDATE_ID: 24,
  NODE_DEFS_CACHE: 25,
  NODE_PERSPECTIVE_MATRIX: 26,
  NODE_VIRTUAL_DOM: 27,
  NODE_CACHE_AS_BITMAP: 28,
};

// struct用
const STRUCT_KEY = {
  STRUCT_NODE: 0,
  STRUCT_INDEX: 1,
  STRUCT_CHILD_INDEX: 2,
  STRUCT_LV: 3,
  STRUCT_NUM: 4,
  STRUCT_TOTAL: 5,
  STRUCT_HAS_MASK: 6,
};

const ANIMATE_KEY = {
  I_ASSIGNING: 0,
  I_IN_FPS: 1,
  I_IS_DELAY: 2,
  I_BEGIN: 3,
  I_END: 4,
  I_FINISHED: 5,
  I_NEXT_END: 6,
  I_FIRST_PLAY: 7,
  I_FRAME_CB: 8,
  I_PLAY_CB: 9,
  I_TARGET: 10,
  I_ROOT: 11,
  I_FRAMES: 12,
  I_FRAMES_R: 13,
  I_CURRENT_TIME: 14,
  I_NEXT_TIME: 15,
  I_STYLE: 16,
  I_DURATION: 17,
  I_ITERATIONS: 18,
  I_FILL: 19,
  I_PLAYBACK_RATE: 20,
  I_PLAY_COUNT: 21,
  I_PLAY_STATE: 22,
  I_DESTROYED: 23,
  I_START_TIME: 24,
  I_FPS_TIME: 25,
  I_EASING: 26,
  I_ENTER_FRAME: 27,
  I_DELAY: 28,
  I_END_DELAY: 29,
  I_KEYS: 30,
  I_ORIGIN_STYLE: 31,
  I_CURRENT_FRAMES: 32,
  I_CURRENT_FRAME: 33,
  I_SPF_LIMIT: 34,
  I_FPS: 35,
  I_DIRECTION: 36,
  I_FIRST_ENTER: 37,
  I_STAY_BEGIN: 38,
  I_STAY_END: 39,
  I_IS2: 40,
  I_END_TIME: 41,
  I_NODE_CONFIG: 42,
  I_ROOT_CONFIG: 43,
  I_OUT_BEGIN_DELAY: 44,
  I_TIME_STAMP: 45,
};

export default {
  STYLE_KEY, // 大写常量为k，数字为值
  STYLE_R_KEY, // 数字为k，大写常量为值
  STYLE_RV_KEY, // 数字为k，小写为值
  STYLE_V_KEY, // 小写为k，数字为值
  style2Lower,
  style2Upper,
  UPDATE_KEY,
  KEY_FRAME_KEY,
  NODE_KEY,
  STRUCT_KEY,
  ANIMATE_KEY,
};
