import React, { useState } from 'react';

export const StressCalculator: React.FC = () => {
  const [monthlyExpense, setMonthlyExpense] = useState<number>(6000);
  const [savings, setSavings] = useState<number>(50000);

  const months = monthlyExpense > 0 ? (savings / monthlyExpense).toFixed(1) : '0';
  const years = monthlyExpense > 0 ? (Number(months) / 12).toFixed(1) : '0';

  let colorClass = 'text-rose-500';
  if (Number(months) >= 36) {
    colorClass = 'text-emerald-500';
  } else if (Number(months) >= 12) {
    colorClass = 'text-amber-500';
  }

  const waMessage = `Hi LEO, 我测算了我的家庭抗风险指标：目前存款仅能维持 ${months} 个月（约 ${years} 年）。想向你咨询如何做好 3~5 年重疾停工防线对冲与资产隔离。`;

  return (
    <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800">
      <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
        <i className="fa-solid fa-calculator text-amber-500"></i>
        <span>🧮 LEO 现实家庭抗风险压力测试计算器：</span>
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        现实中，如果今天不幸遭遇重疾被迫休养，无任何工作收入，你的家庭存款能维持几年的房贷车贷与生活开销？
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            每月家庭硬性开支 (房贷+车贷+生活费/学费):
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
              RM
            </span>
            <input
              type="number"
              value={monthlyExpense || ''}
              onChange={(e) => setMonthlyExpense(parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            目前个人/家庭应急流动存款总额:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
              RM
            </span>
            <input
              type="number"
              value={savings || ''}
              onChange={(e) => setSavings(parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-800 dark:text-slate-200 space-y-1">
        {monthlyExpense <= 0 ? (
          <p className="font-bold text-rose-500">请输入有效的每月开支。</p>
        ) : (
          <>
            <div className="flex items-center justify-between flex-wrap gap-1">
              <span>在不工作的情况下，你的应急存款仅能支撑家庭：</span>
              <strong className={`${colorClass} text-base font-black`}>
                {months} 个月 ({years} 年)
              </strong>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              💡 <strong>LEO 防线解读：</strong>
              重大疾病（如癌症或心血管危机）平均康复期为{' '}
              <strong>3~5 年 (36~60个月)</strong>
              。若目前存款支撑不足3年，配置专属重疾险理赔金（如 RM 300,000）能瞬间将防线拉满！
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/60164311419?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>将测算结果发送给 LEO (+6016-431 1419) 获取专业建议</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
