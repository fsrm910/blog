// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelectorAll('[id^="content-"]').forEach((content, index) => {
//         const toggle = document.getElementById(`toggle-${index}`);
//
//         // 初始化时应用折叠样式
//         content.classList.add('content-collapse');
//
//         // 检查内容是否具有 'show-more-tag' 类
//         const hasShowMoreTag = content.classList.contains('show-more-tag');
//
//         // 检查内容是否溢出
//         const isOverflowing = content.scrollHeight > content.clientHeight;
//
//         // 如果两个条件都满足，显示“全文”按钮
//         if (hasShowMoreTag && isOverflowing) {
//             toggle.classList.remove('hidden');
//         } else {
//             toggle.classList.add('hidden');
//         }
//     });
// });
//
// function toggleContent(index) {
//     const content = document.getElementById('content-' + index);
//     const toggle = document.getElementById('toggle-' + index);
//
//     if (content.classList.contains('content-collapse')) {
//         content.classList.remove('content-collapse');
//         content.classList.add('expand'); // 展开内容
//         toggle.textContent = '收起';
//     } else {
//         content.classList.remove('expand');
//         content.classList.add('content-collapse'); // 折叠内容
//         toggle.textContent = '全文';
//     }
// }

// 处理操作按钮的点击事件
function handleAction(action, index) {
    if (action === 'save') {
        console.log('点击了暂存按钮');
        // 在这里添加暂存功能的处理逻辑
    } else if (action === 'comment') {
        console.log('点击了评论按钮');
        // 在这里添加评论功能的处理逻辑
    }

    // 处理完后隐藏菜单
    document.getElementById(`actions-${index}`).classList.add('hide');
}


function toggleActions(index) {
    const actionsElement = document.getElementById(`actions-${index}`);
    const isHidden = actionsElement.classList.contains('hide');

    if (isHidden) {
        showActions(index);
    } else {
        hideActions(index);
    }
}

function showActions(index) {
    const actionsElement = document.getElementById(`actions-${index}`);
    actionsElement.classList.remove('hide');
    // 强制重绘，确保过渡效果生效
    void actionsElement.offsetWidth;
    actionsElement.classList.remove('opacity-0', 'scale-x-0');
    actionsElement.classList.add('opacity-100', 'scale-x-100');
}

function hideActions(index) {
    const actionsElement = document.getElementById(`actions-${index}`);
    actionsElement.classList.remove('opacity-100', 'scale-x-100');
    actionsElement.classList.add('opacity-0', 'scale-x-0');

    // 延迟添加 'hide' 类，确保过渡动画完成
    setTimeout(() => {
        actionsElement.classList.add('hide');
    }, 300); // 与过渡持续时间一致
}

// 监听整个文档的点击事件
document.addEventListener('click', (event) => {
    const target = event.target;
    const actionsElements = document.querySelectorAll('[id^="actions-"]');

    actionsElements.forEach((actionsElement) => {
        const index = actionsElement.id.split('-')[1];
        const buttonElement = document.getElementById(`show-actions-button-${index}`);

        if (!actionsElement.contains(target) && !buttonElement.contains(target)) {
            hideActions(index);
        }
    });
});