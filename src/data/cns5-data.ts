// WHO CNS5 分类速览数据 —— 内容重构自 Radiopaedia《WHO classification of CNS tumors》
// 与 mri-wiki-cn 知识库笔记同源（CC BY-NC-SA，附署名与非商业声明）

export type TreeNode = {
  id: string;
  name: string;
  slug?: string; // 对应 /types/<slug>/ 词条页（英文名）
  note?: string;
  items: {
    name: string;
    slug?: string;
    note?: string;
    children?: { name: string; slug?: string; note?: string }[];
  }[];
};

export const families: TreeNode[] = [
  {
    id: "gliomas",
    slug: "gliomas-glioneuronal-and-neuronal-tumors",
    name: "胶质瘤、胶质神经元肿瘤和神经元肿瘤",
    note: "CNS5 中最大的家族，成人弥漫性胶质瘤三分法是临床主战场",
    items: [
      {
        name: "成人弥漫性胶质瘤",
        slug: "adult-type-diffuse-gliomas",
        children: [
          { name: "星形细胞瘤，IDH 突变型（无 1 级，仅 2/3/4 级）", slug: "astrocytoma-idh-mutant" },
          { name: "少突胶质细胞瘤，IDH 突变型且 1p/19q 联合缺失", slug: "oligodendroglioma" },
          { name: "胶质母细胞瘤，IDH 野生型（恒为 4 级）", slug: "glioblastoma" },
        ],
      },
      {
        name: "儿童弥漫性低级别胶质瘤",
        slug: "pediatric-type-diffuse-low-grade-gliomas",
        children: [
          { name: "MYB/MYBL1 改变弥漫星形细胞瘤", slug: "myb-mybl1-diffuse-astrocytoma" },
          { name: "血管中心型胶质瘤", slug: "angiocentric-glioma" },
          { name: "PLNTY（青少年多形性低级别神经上皮肿瘤）", slug: "plnty" },
          { name: "MAPK 通路改变弥漫低级别胶质瘤", slug: "mapk-pathway-diffuse-low-grade-glioma" },
        ],
      },
      {
        name: "儿童弥漫性高级别胶质瘤",
        slug: "pediatric-type-diffuse-high-grade-gliomas",
        children: [
          { name: "弥漫性中线胶质瘤，伴 H3 K27 改变（原 DIPG）", slug: "diffuse-midline-glioma-h3-k27" },
          { name: "弥漫性半球胶质瘤，H3 G34 突变型", slug: "diffuse-hemispheric-glioma-h3-g34" },
          { name: "弥漫性儿童型高级别胶质瘤，H3 及 IDH 野生型", slug: "pdhg-h3-idh-wildtype" },
          { name: "婴儿型半球胶质瘤", slug: "infant-type-hemispheric-glioma" },
        ],
      },
      {
        name: "局限性星形细胞胶质瘤",
        slug: "circumscribed-astrocytic-gliomas",
        children: [
          { name: "毛细胞型星形细胞瘤", slug: "pilocytic-astrocytoma" },
          { name: "毛细胞样高级别星形细胞瘤", slug: "high-grade-astrocytoma-with-piloid-features" },
          { name: "多形性黄色星形细胞瘤（PXA）", slug: "pleomorphic-xanthoastrocytoma" },
          { name: "室管膜下巨细胞星形细胞瘤（SEGA）", slug: "sega" },
          { name: "脊索样胶质瘤", slug: "chordoid-glioma" },
          { name: "星形母细胞瘤，伴 MN1 改变", slug: "astroblastoma-mn1-altered" },
        ],
      },
      {
        name: "胶质神经元和神经元肿瘤",
        slug: "glioneuronal-and-neuronal-tumors",
        children: [
          { name: "节细胞胶质瘤 / 节细胞瘤", slug: "ganglioglioma" },
          { name: "DNET（胚胎发育不良型神经上皮肿瘤）", slug: "dnet" },
          { name: "中枢神经细胞瘤 / 室外神经细胞瘤 / 小脑脂肪神经细胞瘤", slug: "neurocytoma-spectrum" },
          { name: "乳头状 / 形成菊形团的 / 粘液样胶质神经元肿瘤", slug: "glioneuronal-tumor-variants" },
          { name: "弥漫性软脑膜胶质神经元肿瘤", slug: "diffuse-leptomeningeal-glioneuronal-tumor" },
          { name: "多结节及空泡状神经元肿瘤", slug: "multinodular-vacuolating-neuronal-tumor" },
          { name: "小脑发育不良性节细胞瘤（Lhermitte-Duclos 病）", slug: "lhermitte-duclos" },
        ],
      },
      {
        name: "室管膜肿瘤",
        slug: "ependymal-tumors",
        note: "分子分组取代解剖位置成为命名核心",
        children: [
          { name: "幕上室管膜瘤：ZFTA 融合阳性 / YAP1 融合阳性", slug: "supratentorial-ependymoma" },
          { name: "后颅窝室管膜瘤：PFA 组 / PFB 组", slug: "posterior-fossa-ependymoma" },
          { name: "脊髓室管膜瘤（含 MYCN 扩增型）", slug: "spinal-ependymoma" },
          { name: "粘液乳头型室管膜瘤 / 室管膜下瘤", slug: "myxopapillary-subependymoma" },
        ],
      },
    ],
  },
  {
    id: "choroid-plexus",
    slug: "choroid-plexus-tumors",
    name: "脉络丛肿瘤",
    items: [
      { name: "脉络丛乳头状瘤", slug: "choroid-plexus-papilloma" },
      { name: "不典型性脉络丛乳头状瘤", slug: "atypical-choroid-plexus-papilloma" },
      { name: "脉络丛癌", slug: "choroid-plexus-carcinoma" },
    ],
  },
  {
    id: "embryonal",
    slug: "embryonal-tumors",
    name: "胚胎性肿瘤",
    note: "髓母细胞瘤按分子通路分四组，WNT 组预后最好",
    items: [
      {
        name: "髓母细胞瘤（分子定义）",
        slug: "medulloblastoma",
        children: [
          { name: "WNT 活化型", slug: "medulloblastoma-subgroups" },
          { name: "SHH 活化型，TP53 野生型", slug: "medulloblastoma-subgroups" },
          { name: "SHH 活化型，TP53 突变型", slug: "medulloblastoma-subgroups" },
          { name: "非 WNT/非 SHH 活化型（Group 3/4）", slug: "medulloblastoma-subgroups" },
        ],
      },
      {
        name: "其他 CNS 胚胎性肿瘤",
        children: [
          { name: "非典型畸胎样/横纹肌样肿瘤（AT/RT）", slug: "other-embryonal-tumors" },
          { name: "伴多层菊形团的胚胎性肿瘤（ETMR）", slug: "other-embryonal-tumors" },
          { name: "CNS 神经母细胞瘤，FOXR2 激活型", slug: "other-embryonal-tumors" },
          { name: "伴 BCOR 内部串联重复的 CNS 肿瘤", slug: "other-embryonal-tumors" },
          { name: "筛状神经上皮肿瘤（暂定纳入）", slug: "other-embryonal-tumors" },
        ],
      },
    ],
  },
  {
    id: "pineal",
    slug: "pineal-tumors",
    name: "松果体肿瘤",
    items: [
      { name: "松果体细胞瘤", slug: "pineocytoma" },
      { name: "中分化松果体实体瘤", slug: "pineal-parenchymal-tumor-of-intermediate-differentiation" },
      { name: "松果体母细胞瘤", slug: "pineoblastoma" },
      { name: "松果体区乳头状肿瘤", slug: "papillary-tumor-of-pineal-region" },
      { name: "松果体区促纤维增生型粘液样肿瘤，SMARCB1 突变型", slug: "desmoplastic-myxoid-smarcb1" },
    ],
  },
  {
    id: "nerve",
    slug: "cranial-and-paraspinal-nerve-tumors",
    name: "颅神经和椎旁神经肿瘤",
    items: [
      { name: "神经鞘瘤（施万细胞瘤） / 神经纤维瘤 / 神经束膜瘤", slug: "schwannoma" },
      { name: "混合型神经鞘瘤", slug: "hybrid-nerve-sheath-tumor" },
      { name: "恶性黑色素性神经鞘肿瘤 / 恶性外周神经鞘瘤（MPNST）", slug: "mpnst" },
      { name: "副神经节瘤（马尾）", slug: "paraganglioma" },
    ],
  },
  {
    id: "meningioma",
    slug: "meningioma",
    name: "脑（脊）膜瘤",
    note: "CNS5 中为单一 type，下辖多个 subtype（脊索样、横纹肌样、透明细胞等）",
    items: [{ name: "脑（脊）膜瘤（一个 type，多 subtype）", slug: "meningioma" }],
  },
  {
    id: "mesenchymal",
    slug: "mesenchymal-non-meningothelial-tumors",
    name: "间叶性非脑膜上皮来源的肿瘤",
    items: [
      {
        name: "软组织肿瘤",
        children: [
          { name: "孤立性纤维性肿瘤（SFT，已与血管外皮细胞瘤合并）", slug: "solitary-fibrous-tumor" },
          { name: "血管肿瘤（血管瘤 / 血管畸形）", slug: "vascular-tumors-cns" },
          { name: "横纹肌肉瘤", slug: "rhabdomyosarcoma" },
          { name: "FET-CREB 融合颅内间叶肿瘤（暂定）/ CIC 重排肉瘤 / DICER1 突变颅内肉瘤", slug: "intracranial-mesenchymal-sarcomas" },
          { name: "尤文氏肉瘤", slug: "ewing-sarcoma" },
        ],
      },
      {
        name: "软骨骨性肿瘤",
        children: [
          { name: "间叶性软骨肉瘤 / 软骨肉瘤", slug: "chondrosarcoma" },
          { name: "脊索瘤（含低分化脊索瘤）", slug: "chordoma" },
        ],
      },
      {
        name: "黑色素细胞肿瘤",
        children: [
          { name: "弥漫性脑膜黑色素细胞增生症 / 黑色素瘤病", slug: "meningeal-melanocytic-proliferation" },
          { name: "脑膜黑色素细胞瘤 / 脑膜黑色素瘤", slug: "meningeal-melanocytoma-melanoma" },
        ],
      },
    ],
  },
  {
    id: "hematolymphoid",
    slug: "hematolymphoid-tumors",
    name: "淋巴和造血系统肿瘤",
    items: [
      {
        name: "淋巴瘤",
        children: [
          { name: "CNS 原发性弥漫大 B 细胞淋巴瘤", slug: "primary-dlbcl-cns" },
          { name: "免疫缺陷相关 CNS 淋巴瘤", slug: "immunodeficiency-cns-lymphoma" },
          { name: "血管内大 B 细胞淋巴瘤 / 淋巴瘤样肉芽肿病", slug: "intravascular-lymphoma" },
          { name: "硬脑膜 MALT 淋巴瘤等其他罕见类型", slug: "dural-malt-lymphoma" },
        ],
      },
      {
        name: "组织细胞肿瘤",
        children: [
          { name: "Erdheim-Chester 病 / Rosai-Dorfman 病", slug: "erdheim-chester-rosai-dorfman" },
          { name: "朗格汉斯细胞组织细胞增生症（LCH）", slug: "langerhans-histiocytosis" },
          { name: "组织细胞肉瘤", slug: "histiocytic-sarcoma" },
        ],
      },
    ],
  },
  {
    id: "germ-cell",
    slug: "germ-cell-tumors",
    name: "生殖细胞肿瘤",
    items: [
      { name: "生殖细胞瘤", slug: "germinoma" },
      { name: "成熟 / 未成熟畸胎瘤 / 伴体细胞型恶性变的畸胎瘤", slug: "teratoma-spectrum" },
      { name: "胚胎癌 / 卵黄囊瘤 / 绒毛膜癌 / 混合性生殖细胞肿瘤", slug: "malignant-gct-others" },
    ],
  },
  {
    id: "sellar",
    slug: "tumors-of-the-sellar-region",
    name: "鞍区肿瘤",
    items: [
      { name: "造釉细胞型颅咽管瘤 / 乳头型颅咽管瘤", slug: "craniopharyngioma" },
      { name: "垂体细胞瘤 / 颗粒细胞瘤 / 梭形细胞嗜酸细胞瘤", slug: "pituicytoma-spectrum" },
      { name: "垂体腺瘤（pitNET，垂体神经内分泌肿瘤）", slug: "pituitary-adenoma" },
      { name: "垂体母细胞瘤", slug: "pituitary-blastoma" },
    ],
  },
  {
    id: "metastases",
    slug: "metastases-to-the-cns",
    name: "CNS 转移瘤",
    items: [
      { name: "脑实质与脊髓实质转移", slug: "metastases-to-the-cns" },
      { name: "脑膜转移", slug: "metastases-to-the-cns" },
    ],
  },
];

export const layers = [
  { label: "综合诊断", desc: "integrated diagnosis——四层信息的最终合成" },
  { label: "组织病理学分类", desc: "histopathological classification" },
  { label: "CNS WHO 分级", desc: "阿拉伯数字 1–4，报告须带 \"CNS WHO\" 前缀" },
  { label: "分子信息", desc: "IDH / 1p19q / EGFR / TERT / H3 / +7−10 ……" },
];

export const gradingChanges = [
  {
    title: "类型内分级",
    body: "放弃旧版「跨类型等级等价」，改为每个 type 内部分级；但保留妥协：IDH 突变型星形细胞瘤没有 1 级，GBM（IDH 野生型）只会是 4 级。",
  },
  {
    title: "等级地位下降",
    body: "分级常不如位置与可及疗法重要——WNT 活化型髓母细胞瘤虽为 4 级，治疗预后却远好于其他髓母亚型。",
  },
  {
    title: "阿拉伯数字 + CNS WHO 前缀",
    body: "I–IV 改为 1–4，书写如 \"meningioma, CNS WHO grade 1\"，提示 CNS 与全身肿瘤分级标准不同。",
  },
  {
    title: "分子分级首次入规",
    body: "分子特征可推翻组织学分级：IDH 野生型星形细胞瘤出现 EGFR 扩增 / TERT 启动子突变 / +7−10 之一，即按 4 级（GBM）处理。",
  },
];

export const practicePoints = [
  "报告书写规范：综合诊断 + 「CNS WHO N 级」前缀，不再用罗马数字、不再用「间变性（anaplastic）」修饰词。",
  "遇到「低级别形态但分子高危」的病例（EGFR / TERT / +7−10），按 4 级管理——影像随访信号的解读要结合分子背景。",
  "NOS ≠ NEC：NOS 是分子检测不全，NEC 是分子特征已完全明确但不符现有分类，后续处理策略不同。",
  "分级不等同预后：分子亚型（如 WNT 髓母）可跨级改善预后。",
];
